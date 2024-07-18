using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using RMF.Models;
using RMF.Repositories;

namespace RMF.Services
{
    public class RoomMateFinderManager : IRoomMateFinderManager
    {
        private readonly IRepository<RoomDetails> roomDetailsRepository;
        public RoomMateFinderManager(IRepository<RoomDetails> roomDetailsRepository)
        {
            this.roomDetailsRepository = roomDetailsRepository;
        }
        public Task<List<RoomDetails>> GetAllRoomDetailsAsync()
        {
            var rooms = roomDetailsRepository.GetRoomDetailsAsync();
            if (rooms.Result.Count == 0)
            {
                throw new Exception("Room missing");
            }
            return rooms;
        }
        public Task<RoomDetails> CreateRoomDetailsAsync(RoomDetails roomDetails)
        {
            if (roomDetails == null) {
                throw new ArgumentNullException("Room is null");
            }
            roomDetails.Id = ObjectId.GenerateNewId().ToString();
            
            var roomCreated = roomDetailsRepository.CreateRoomDetailsAsync(roomDetails);
            return roomCreated;

        }
        public void CreateMultipleRoomsAtOnceAsync(int requiredRooms)
        {
            if (requiredRooms == 0) {
                throw new ArgumentNullException("required room is 0");
            }
            IEnumerable<RoomDetails> entity = CreateListOfRoomDetails(requiredRooms);
            roomDetailsRepository.CreateMultipleRoomDetailsAsync(entity);
        }
        public List<RoomDetails> CreateListOfRoomDetails(int requiredRooms)
        {
            List<RoomDetails> roomDetails = new List<RoomDetails>();
            Random random = new Random();
            for (int i = 0; i < requiredRooms; i++)
            {
                var roomDetail = new RoomDetails();
                var address = new Address();
                var requirement = new Requirement();
                var genders = new string[] { "Male", "Female", "Any" };
                int randomNumber = random.Next(0, 3);
                var cityAndState = GenerateRandomCityAndState();
                roomDetail.Id = ObjectId.GenerateNewId().ToString();
                roomDetail.Name = "Test_Data";
                address.Area = "random_city";
                address.City = cityAndState.Key;
                address.State = cityAndState.Value;
                roomDetail.Address = address;
                requirement.Size = GetRoomSize();
                requirement.Vacancy = random.Next(1,4);
                requirement.Gender = genders[randomNumber];
                requirement.Message = "message";
                roomDetail.Requirement = requirement;
                roomDetail.amount = random.Next(10, 81) * 500;
                roomDetail.status = "vacant";
                roomDetails.Add(roomDetail);
            }

            return roomDetails;  

        }
        public KeyValuePair<string,string> GenerateRandomCityAndState()
        {
            Random random = new Random();
            Dictionary<string, string> citiesAndStates = new Dictionary<string, string>
            {
                {"Mumbai", "Maharashtra"},
                {"Delhi", "Delhi"},
                {"Bangalore", "Karnataka"},
                {"Hyderabad", "Telangana"},
                {"Ahmedabad", "Gujarat"},
                {"Chennai", "Tamil Nadu"},
                {"Kolkata", "West Bengal"},
                {"Surat", "Gujarat"},
                {"Pune", "Maharashtra"},
                {"Jaipur", "Rajasthan"},
                {"Lucknow", "Uttar Pradesh"},
                {"Kanpur", "Uttar Pradesh"},
                {"Nagpur", "Maharashtra"},
                {"Indore", "Madhya Pradesh"},
                {"Thane", "Maharashtra"},
                {"Bhopal", "Madhya Pradesh"},
                {"Visakhapatnam", "Andhra Pradesh"},
                {"Pimpri-Chinchwad", "Maharashtra"},
                {"Patna", "Bihar"},
                {"Vadodara", "Gujarat"},
                {"Ghaziabad", "Uttar Pradesh"},
                {"Ludhiana", "Punjab"},
                {"Agra", "Uttar Pradesh"},
                {"Nashik", "Maharashtra"},
                {"Faridabad", "Haryana"},
                {"Meerut", "Uttar Pradesh"},
                {"Rajkot", "Gujarat"},
                {"Kalyan-Dombivali", "Maharashtra"},
                {"Vasai-Virar", "Maharashtra"},
                {"Varanasi", "Uttar Pradesh"},
                {"Srinagar", "Jammu and Kashmir"},
                {"Aurangabad", "Maharashtra"},
                {"Dhanbad", "Jharkhand"},
                {"Amritsar", "Punjab"},
                {"Navi Mumbai", "Maharashtra"},
                {"Allahabad", "Uttar Pradesh"},
                {"Ranchi", "Jharkhand"},
                {"Howrah", "West Bengal"},
                {"Coimbatore", "Tamil Nadu"},
                {"Jabalpur", "Madhya Pradesh"},
                {"Gwalior", "Madhya Pradesh"},
                {"Vijayawada", "Andhra Pradesh"},
                {"Jodhpur", "Rajasthan"},
                {"Madurai", "Tamil Nadu"},
                {"Raipur", "Chhattisgarh"},
                {"Kota", "Rajasthan"},
                {"Guwahati", "Assam"},
                {"Chandigarh", "Chandigarh"},
                {"Solapur", "Maharashtra"},
                {"Hubli-Dharwad", "Karnataka"},
                {"Bareilly", "Uttar Pradesh"},
                {"Moradabad", "Uttar Pradesh"},
                {"Mysore", "Karnataka"},
                {"Gurgaon", "Haryana"},
                {"Aligarh", "Uttar Pradesh"},
                {"Jalandhar", "Punjab"},
                {"Tiruchirappalli", "Tamil Nadu"},
                {"Bhubaneswar", "Odisha"},
                {"Salem", "Tamil Nadu"},
                {"Warangal", "Telangana"},
                {"Bhiwandi", "Maharashtra"},
                {"Saharanpur", "Uttar Pradesh"},
                {"Guntur", "Andhra Pradesh"},
                {"Amravati", "Maharashtra"},
                {"Bikaner", "Rajasthan"},
                {"Noida", "Uttar Pradesh"},
                {"Jamshedpur", "Jharkhand"},
                {"Bhilai", "Chhattisgarh"},
                {"Cuttack", "Odisha"},
                {"Kochi", "Kerala"},
                {"Udaipur", "Rajasthan"},
                {"Bhavnagar", "Gujarat"},
                {"Dehradun", "Uttarakhand"},
                {"Asansol", "West Bengal"},
                {"Nanded", "Maharashtra"},
                {"Ajmer", "Rajasthan"},
                {"Jamnagar", "Gujarat"},
                {"Gulbarga", "Karnataka"},
                {"Jhansi", "Uttar Pradesh"},
                {"Ujjain", "Madhya Pradesh"},
                {"Loni", "Uttar Pradesh"},
                {"Siliguri", "West Bengal"},
                {"Jammu", "Jammu and Kashmir"},
                {"Sangli-Miraj & Kupwad", "Maharashtra"},
                {"Nellore", "Andhra Pradesh"}
            };
            int randomNumber = random.Next(0, citiesAndStates.Count);
            var cityAndState = citiesAndStates.ElementAt(randomNumber);
            return cityAndState;
        }
        public string GetRoomSize()
        {
            Random random = new Random();
            var roomSizes = new string[] { 
                "1BHK","2BHK","3BHK","1RK","2RK","3RK"
            };
            return roomSizes[random.Next(0, roomSizes.Length)];
        }
    }
}
