using ECommerceAPI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceAPI.Helpers
{
    public class TreeviewHelper
    {
        public static List<T> BuildTreeview<T>(List<T> parents, List<T> wholeList, string parentIdName) where T: ITreeview<T>
        {
            if (parents == null)
            {
                parents = wholeList.Where(x => x.ParentId == 0).ToList();
                parents.ForEach(p => wholeList.Remove(p));
            }
            foreach (var parent in parents)
            {
                foreach (var child in wholeList.ToList())
                {
                    if (parent.GetType().GetProperty(parentIdName).GetValue(parent).ToString().Equals(child.ParentId.ToString()))
                    {
                        parent.Children.Add(child);
                        wholeList.Remove(child);
                        BuildTreeview(new List<T>() { child }, wholeList, parentIdName);
                    }
                }
                wholeList.Remove(parent);
            }
            return parents;
        }
        public static List<T> FindTouchedNodes<T>(List<T> wholeList, List<T> touched, Guid parentGuid) where T : ITreeview<T>, ITreeViewEditable<T>
        {
            foreach (var node in wholeList)
            {
                node.IndGuid = Guid.NewGuid();
                node.ParentGuid = parentGuid;

                if (node.Touched || node.ToBeDeleted)
                {
                    touched.Add(node);
                }
                FindTouchedNodes<T>(node.Children, touched, node.IndGuid);
                
            }
            return touched;
        }
    }
}
