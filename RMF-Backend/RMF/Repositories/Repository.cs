using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using RMF.Models;
using SharpCompress.Common;

namespace RMF.Repositories
{
    public class Repository <TEntity>: IRepository<TEntity>
    {
        public readonly IConfiguration configuration;
        private readonly IMongoCollection<TEntity> _room;
        public Repository() {
            var mongoDBClient = new MongoClient("mongodb://localhost:27017/");
            IMongoDatabase mongoDb = mongoDBClient.GetDatabase("RMF");
            _room = mongoDb.GetCollection<TEntity>("RoomDetails");
        }
       
        public async Task<List<TEntity>> GetRoomDetailsAsync()
        {
            return _room.Find(x => true).ToList();
        }
        public async Task<long> GetRoomsCount()
        {
            return _room.CountDocuments(x => true);
        }
        public async Task<IEnumerable<TEntity>> GetLimitedRoomDetailsAsync(int skip, int limit)
        {
            return _room.Find(x => true).ToList().Skip(skip).Take(limit);
        }
        public async Task<TEntity> CreateRoomDetailsAsync(TEntity roomDetails)
        {
            _room.InsertOne(roomDetails);
            return roomDetails;
        }
        public void CreateMultipleRoomDetailsAsync(IEnumerable<TEntity> entities)
        { 
            _room.InsertMany(entities);
        }
    }
}
