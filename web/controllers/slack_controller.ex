defmodule Ghost.SlackController do
  use Ghost.Web, :controller

  @slack_token System.get_env("SLACK_TOKEN")

  def generate(conn, %{"command" => "/ghost", "text" => text, "token" => token} = params) do
    case token do
      @slack_token ->
        conn
        |> json(%{"text" => "#{Atom.to_string(conn.scheme)}://#{conn.host}/#{UUID.uuid4()}"})
      _ ->
        conn
        |> put_status(:not_found)
        |> render("404.html")
    end
  end

end

token2 = "abc"
token = "abc"

case token do
  ^token2 -> IO.inspect(token2)
  _ -> false
end
