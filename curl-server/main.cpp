#include <cstdlib>
#include <iostream>
#include <array>
#include <cstdio>
#include <string>


std::string run_command(char* command) {

    // Open a pipe to capture the command output
    FILE* pipe = popen(command, "r");
    if (!pipe) {
        std::cerr << "Error opening pipe." << std::endl;
        return "Error";
    }

    // Read the output of the command
    std::array<char, 128> buffer;
    std::string result;
    while (fgets(buffer.data(), buffer.size(), pipe) != nullptr) {
        result += buffer.data();
    }

    // Close the pipe
    pclose(pipe);

    // Print the captured output
    std::cout << "Command output:" << std::endl;
    std::cout << result << std::endl;

    return "0sd";
}
int main() {
    // Command to be executed
    const char* command = "curl -v example.com";


    return 0;
}
