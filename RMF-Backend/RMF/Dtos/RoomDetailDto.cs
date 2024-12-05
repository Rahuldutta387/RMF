using RMF.Models;

namespace RMF.Dtos
{
    public class RoomDetailDto
    {
        public IEnumerable<RoomDetails> RoomDetails { get; set; }
        public bool IsNext {  get; set; }
    }
}
