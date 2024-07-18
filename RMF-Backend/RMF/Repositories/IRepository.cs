namespace RMF.Repositories
{
    public interface IRepository <TEntity>
    {
        public Task<List<TEntity>> GetRoomDetailsAsync();
        public Task<TEntity> CreateRoomDetailsAsync(TEntity roomDetails);
        public void CreateMultipleRoomDetailsAsync(IEnumerable<TEntity> entities);
        public  Task<IEnumerable<TEntity>> GetLimitedRoomDetailsAsync(int skip, int limit);
    }
}
