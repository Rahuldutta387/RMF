using RMF.Models;

namespace RMF.Services
{
    public interface IRoomMateFinderManager
    {
        public Task<List<RoomDetails>> GetAllRoomDetailsAsync();
        public Task<RoomDetails> CreateRoomDetailsAsync(RoomDetails roomDetails);
        public void CreateMultipleRoomsAtOnceAsync(int requiredRooms);
    }
}
