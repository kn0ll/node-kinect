node-hands
===

intention
---
node-hands is a straight forward nodejs library which provides live x, y, and z hand coordinates from an xbox kinect to the browser via socket.io. if you're so inclined, [click here for a demo video](http://vimeo.com/user6080011/node-hands).

installation
---
1. install [libfreenect](openkinect.org/wiki/Getting_Started)

2. install [liblo](http://liblo.sourceforge.net/)

3. download node-hands

        git clone git@github.com:catshirt/node-hands.git
        cd node-hands
        npm install

4. compile bionic-dj

    *(while still inside `node-hands` directory...)*

        git submodule init
        git submodule update
        cd lib/bionic-dj
        gcc -lfreenect -llo -framework OpenGL -framework GLUT -I ~/Code/libfreenect/include bionic_dj.c

    where `~/Code/libfreenect/include` is the path to your libfreenect header files

---

**note**: in newer node versions, you will need to remove `require.paths.unshift(__dirname + '/jspack');` from `datatypes.js` in `osc4node`, because `require.paths` is deprecated.