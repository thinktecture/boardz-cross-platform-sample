using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using BoardGame = BoardGame.Api.Models.BoardGame;

namespace BoardGame.Api.Storages
{
    public class BoardGameStorage : IStorage<Models.BoardGame>
    {
        private ConcurrentDictionary<Guid, Models.BoardGame> _storage = new ConcurrentDictionary<Guid, Models.BoardGame>();

        public BoardGameStorage()
        {
            var guid = Guid.NewGuid();
            _storage.TryAdd(guid, new Models.BoardGame()
            {
                Id = guid,
                Name = "Jumanji",
                Description = "Crazy board game!"
            });

            guid = Guid.NewGuid();
            _storage.TryAdd(guid, new Models.BoardGame()
            {
                Id = guid,
                Name = "Monopoly",
                Description = "24h board game"
            });

            guid = Guid.NewGuid();
            _storage.TryAdd(guid, new Models.BoardGame()
            {
                Id = guid,
                Name = "You don't know, Jack!",
                Description = "You really don't"
            });

            guid = Guid.NewGuid();
            _storage.TryAdd(guid, new Models.BoardGame()
            {
                Id = guid,
                Name = "Jenga",
                Description = "Let the tower fall."
            });
        }

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

        public int Count()
        {
            return _storage.Count;
        }
    }
}