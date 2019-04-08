import {Server} from './server';

class Main {

    public static main () {
        new Server(4711).start();
    }
}

Main.main();
