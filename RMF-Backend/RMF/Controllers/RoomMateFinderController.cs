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
            try
            {              
                var rooms = await this.roomMateFinderManager.GetLimitRoomDetailsAsync(skip, limit);
                return Ok(rooms);
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
