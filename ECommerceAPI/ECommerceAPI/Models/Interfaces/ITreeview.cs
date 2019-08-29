using System;
using System.Collections.Generic;

namespace ECommerceAPI.Models.Interfaces
{
    public interface ITreeview<T>
    {
        int ParentId { get; set; }
        List<T> Children { get; set; }
    }
    public interface ITreeViewEditable<T>
    {
        bool Touched { get; set; }
        Guid IndGuid { get; set; }
        Guid ParentGuid { get; set; }
        bool ToBeDeleted { get; set; }
    }
}
