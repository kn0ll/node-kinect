node-hands
===

intention
---
node-hands is a straight forward nodejs library which provides live x, y, and z hand coordinates from an xbox kinect to the browser via socket.io. if you're so inclined, [click here for a demo video](http://vimeo.com/user6080011/node-hands).

installation
---
1. install [libfreenect](openkinect.org/wiki/Getting_Started)

2. install [liblo](http://liblo.sourceforge.net/)

3. download and run node-hands

        git clone git@github.com:catshirt/node-hands.git
        cd node-hands
        npm install
        node server.js

    if you access [localhost:8080](http://localhost:8080) you'll have an open socket waiting for OSC messages.

4. compile and run bionic-dj

        git submodule init
        git submodule update
        cd lib/bionic-dj
        gcc -lfreenect -llo -framework OpenGL -framework GLUT -I ~/Code/libfreenect/include lib/bionic-djbionic_dj.c
        ./a.out

    where `~/Code/libfreenect/include` is the path to your libfreenect header files

bionic-dj should now be sending OSC messages which nodejs forwards to the browser.

