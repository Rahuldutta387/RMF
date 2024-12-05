using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RMF.Dtos;
using RMF.Models;
using RMF.Services;

namespace RMF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomMateFinderController : ControllerBase
    {
        private readonly IRoomMateFinderManager roomMateFinderManager;
        public RoomMateFinderController(IRoomMateFinderManager roomMateFinderManager)
        {
            this.roomMateFinderManager = roomMateFinderManager;
        }
        [HttpPost]
        [Route("testingApi/postMultipleRooms")]
        public async Task<IActionResult> CreateMultipleRoomsAtOnce(int requiredRooms)
        {
            try
            {
                this.roomMateFinderManager.CreateMultipleRoomsAtOnceAsync(requiredRooms);
                return Ok(requiredRooms+" rooms created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        
        [HttpGet]
        [Route("getRoomDetails")]
        public async Task<IActionResult> GetLimitedRoomDetails(int skip, int limit)
        {
            RoomDetailDto roomDetailDto = new RoomDetailDto();
            try
            {              
                var rooms = await this.roomMateFinderManager.GetLimitRoomDetailsAsync(skip, limit);
                roomDetailDto.RoomDetails = rooms;
                var isNext = this.roomMateFinderManager.isNext(skip);
                roomDetailDto.IsNext = isNext;
                return Ok(roomDetailDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("createRoomDetails")]
        public async Task<IActionResult> CreateRoomDetails(RoomDetails roomDetails)
        {
            try
            {
                var roomDetailsAsync = await this.roomMateFinderManager.CreateRoomDetailsAsync(roomDetails);
                return Ok(roomDetailsAsync);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
