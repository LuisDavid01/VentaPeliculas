
using ventaPeliculaWeb.Models;


namespace ventaPeliculaWeb.Services
{
    public class TrieService : ITrieService
    {
        private readonly TrieModel _trieModel;
        public TrieService() { 
            _trieModel = new TrieModel();
            InsertTrie("prueba");
            InsertTrie("prueba2");
            InsertTrie("prueba3");
        }
        public bool InsertTrie(string word)
        {
            if(word == null) return false;
            var tempNode = _trieModel.Root;
            foreach (var c in word)
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

        public List<string> StartWith( string prefix)
        {
            if(prefix == null)
            {
                return [];
            }
            var result = new List<string>();
            var curr = _trieModel.Root;
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
    }
}
