using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace BoardGame.Api.Storages
{
    public class BoardGameStorage : IStorage<Models.BoardGame>
    {
        private ConcurrentDictionary<Guid, Models.BoardGame> _storage = new ConcurrentDictionary<Guid, Models.BoardGame>();

        public Models.BoardGame Get(Guid id)
        {
            Models.BoardGame game;
            if (_storage.TryGetValue(id, out game))
            {
                return game;
            }

            throw new Exception("Item not found");
        }

        public Guid Add(Models.BoardGame item)
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
            Models.BoardGame game;
            if (!_storage.TryRemove(id, out game))
            {
                throw new Exception("Removing item not possible");
            }
        }

        public void Update(Models.BoardGame item)
        {
            _storage.TryUpdate(item.Id, item, Get(item.Id));
        }

        public ICollection<Models.BoardGame> List()
        {
            return _storage.Values;
        }
    }
}