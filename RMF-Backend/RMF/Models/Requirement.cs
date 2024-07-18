using MongoDB.Bson.Serialization.Attributes;

namespace RMF.Models
{
    public class Requirement
    {
        [BsonElement("size")]
        public string Size { get; set; } = string.Empty;
        [BsonElement("vacancy")]
        public int Vacancy {  get; set; } = 0;
        [BsonElement("gender")]
        public string Gender {  get; set; } = string.Empty;
        [BsonElement("message")]
        public string Message {  get; set; } = string.Empty;

    }
}
