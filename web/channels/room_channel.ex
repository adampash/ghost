defmodule Ghost.RoomChannel do
  use Ghost.Web, :channel

  def join("rooms:" <> room_id, payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  @doc """
  Handle exchanging messages in case I don't do webrtc
  """
  def handle_in("message", payload, socket) do
    broadcast!(socket, "new_message", payload)
    {:noreply, socket}
  end

  @doc """
  Handle typing user signaling
  """
  def handle_in("typing", payload, socket) do
    broadcast!(socket, "user_typing", payload)
    {:noreply, socket}
  end

  @doc """
  Handle signaling messages for webrtc
  """
  def handle_in("signal", payload, socket) do
    broadcast!(socket, "signaling_message", payload)
    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (rooms:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  # defp authorized?(_payload) do
  #   true
  # end
end
