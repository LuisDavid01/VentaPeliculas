using ventaPeliculaWeb.Models;

namespace ventaPeliculaWeb.Services
{
    public interface ITrieService
    {
        public bool InsertTrie(string word);
        public List<string> StartWith(string prefix);
    }
}
