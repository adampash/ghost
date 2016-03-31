defmodule Ghost.SlackController do
  use Ghost.Web, :controller

  @slack_token System.get_env("SLACK_TOKEN")
  @slack_webhook System.get_env("SLACK_WEBHOOK_URL")

  def generate(conn, %{"command" => "/ghost", "text" => text, "token" => token, "user_name" => username} = params) do
    case token do
      @slack_token ->
        conn = generate_url(conn)
        conn
        |> notify_users(text, username)
        |> json(%{"text" => conn.assigns.url})
      _ ->
        conn
        |> put_status(:not_found)
        |> render("404.html")
    end
  end

  defp notify_users(conn, text, username) do
    text
    |> get_users()
    |> Enum.map(spawn(fn user -> notify_user(conn, user, username) end))
    conn
  end

  defp notify_user(conn, user, username) do
    HTTPoison.post!(@slack_webhook, generate_response(conn, user, username))
  end

  defp generate_url(conn) do
    conn
    |> assign(:url, "#{Atom.to_string(conn.scheme)}://#{conn.host}/#{UUID.uuid4()}")
  end

  defp generate_response(conn, user, username) do
    Poison.encode! %{
      text: "#{username} wants you to join this Ghost conversation: #{conn.assigns.url}",
      username: "Ghost",
      icon_emoji: ":ghost:",
      channel: user,
    }
  end

  @doc """
  Given a string of arbitrary length and data, parses out and returns
  a list of @users

  ## Example
  ```
    iex> SlackController.get_users("hi it's @jane and @john")
    ["@jane", "@john"]
  """
  def get_users(string) do
    string
    |> String.split(" ", trim: true)
    |> Enum.filter(&(String.at(&1, 0) == "@"))
  end

end
