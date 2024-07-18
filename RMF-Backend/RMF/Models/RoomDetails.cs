using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace RMF.Models
{
    [BsonIgnoreExtraElements]
    public class RoomDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string Id { get; set; } = string.Empty;
        [BsonElement("name")]
        public string Name { get; set; } = string.Empty ;
        [BsonElement("address")]
        public Address Address { get; set; }
        [BsonElement("requirement")]
        public Requirement Requirement { get; set; }
        [BsonElement("amount")]
        public int amount { get; set; } = 0;
        [BsonElement("status")]
        public string status { get; set; } = string.Empty;
    }
}
