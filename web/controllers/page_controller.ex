defmodule Ghost.PageController do
  use Ghost.Web, :controller

  def index(conn, %{"room_id" => room_id}) do
    render conn, "index.html", room_id: room_id
  end

  def index(conn, _params) do
    conn
    |> redirect(to: "/#{UUID.uuid4()}")
  end

end
