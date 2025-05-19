using System.Numerics;
using Microsoft.AspNetCore.Mvc;

namespace ventaPeliculaWeb.Models
{
    public class TrieModel
    {
        public TrieNode Root { get; set; }

        public TrieModel()
        {
            Root = new TrieNode();
        }
/*
        public bool InsertTrie(TrieModel Node, string Text)
        {

            var tempNode = Node.Root;
            foreach (var c in Text)
            {
                if (!tempNode.children.ContainsKey(c))
                {
                    tempNode.children[c] = new TrieNode();
                }
                tempNode = tempNode.children[c];

            }

            if (tempNode.Terminal)
            {
                return false;
            }
            else
            {
                tempNode.Terminal = true;
                return true;
            }
        }
        public bool Search(TrieModel node, string prefix)
        {
            var curr = node.Root;
            foreach (var c in prefix)
            {
                if (!curr.children.ContainsKey(c))
                {
                    return false;
                }
                curr = curr.children[c];
            }
            return curr.Terminal;
        }

        public List<string> StartWith(TrieModel node, string prefix)
        {
            var result = new List<string>();
            var curr = node.Root;
            foreach (var c in prefix)
            {
                if (!curr.children.ContainsKey(c))
                {
                    return result;
                }
                curr = curr.children[c];
            }

            AddWords(curr, prefix, result);
            return result;
        }

        public void AddWords(TrieNode node, string prefix, List<string> result)
        {
            if (node.Terminal)
            {
                result.Add(prefix);
            }


            foreach (var pair in node.children)
            {
                char c = pair.Key;
                TrieNode child = pair.Value;
                AddWords(child, prefix + c, result);
            }

        }
*/
    }
}
