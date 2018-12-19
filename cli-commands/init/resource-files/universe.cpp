#include "universe.hpp"

namespace Multiverse {
    void universe::create(uint64_t universeId, string& universeName) {
        print("Universe name: ", universeName.c_str());
    }
  
    void universe::get(uint64_t universeId) {
        print("Universe id: ", universeId);
    }
}