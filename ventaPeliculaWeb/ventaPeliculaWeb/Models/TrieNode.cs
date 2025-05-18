namespace ventaPeliculaWeb.Models
{
    public class TrieNode
    {
        public TrieNode()
        {
            children = new Dictionary<char, TrieNode>();
            Terminal = false;
        }

        public Dictionary<char, TrieNode> children { get; set; }
        public bool Terminal { get; set; }
    }
}
