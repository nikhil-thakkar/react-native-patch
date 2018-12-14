# React-Native-Patch CLI
This CLI helps in removing the friction involved in configuring the metro bundler port, currently hard coded to __8081__ in react-native-cli, which may be blocked/in-use for some reasons on your machine.


Though there are options available to overcome this for e.g react-native-port-patcher, but still require extra effort as a developer.

## Pre-requisites
    Requires React Native CLI to be installed.
    (npm install -g react-native-cli)

## Install
    npm install -g react-native-patch

## Alias
You can use an alias for the react-native-patch command as __rnp__ :tada:.

    rnp init AwesomeProject -p 9099

## Sample Usage
    rnp init AwesomeProject -p 9099

## Typscript Support
If you want to generate/create the project using typescript as the language then pass -t as an option.

    rnp init AwesomeProject -p 9099 -t
## Patch
If you already have a project and just want to patch the metro bundler port number use:

    rnp patch -o 8081 -n 9000
Remember -o defaults __8081__ if not provided. To run this command make sure you are at the root of your react native project.


## Credits
[@ktonon](https://github.com/ktonon) for writing react-native-port-patcher. 

I shamelessly copied the logic to replace the hard coded port with the new one.

## Limiations
    Only tested on Mac.

## License
    The MIT License (MIT)

    Copyright (c) 2017 Nikhil Thakkar

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
