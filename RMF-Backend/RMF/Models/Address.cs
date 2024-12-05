using MongoDB.Bson.Serialization.Attributes;

namespace RMF.Models
{
    public class Address
    {
        [BsonElement("area")]
        public string Area { get; set; } = string.Empty;
        [BsonElement("city")]
        public string City { get; set; } = string.Empty ;
        [BsonElement("state")]
        public string State { get; set; } = string.Empty;
    }
}
