using System;
using System.Collections;
using System.Collections.Generic;

namespace BoardGame.Api.Storages
{
    public interface IStorage<T>
        where T: class
    {
        T Get(Guid id);
        Guid Add(T item);
        void Delete(Guid id);
        void Update(T item);
        ICollection<T> List();
        int Count();
    }
}