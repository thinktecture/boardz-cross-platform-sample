using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace BoardGame.Api.Storages
{
    public class PlayerStorage : IStorage<Models.Player>
    {
        private ConcurrentDictionary<Guid, Models.Player> _storage = new ConcurrentDictionary<Guid, Models.Player>();

        public Models.Player Get(Guid id)
        {
            Models.Player game;
            if (_storage.TryGetValue(id, out game))
            {
                return game;
            }

            throw new Exception("Item not found");
        }

        public Guid Add(Models.Player item)
        {
            item.Id = Guid.NewGuid();

            if (_storage.TryAdd(item.Id, item))
            {
                return item.Id;
            }

            throw new Exception("Adding item not possible.");
        }

        public void Delete(Guid id)
        {
            Models.Player game;
            if (!_storage.TryRemove(id, out game))
            {
                throw new Exception("Removing item not possible");
            }
        }

        public void Update(Models.Player item)
        {
            _storage.TryUpdate(item.Id, item, Get(item.Id));
        }

        public ICollection<Models.Player> List()
        {
            return _storage.Values;
        }
    
        public int Count()
        {
            return _storage.Count;
        }
    }
}