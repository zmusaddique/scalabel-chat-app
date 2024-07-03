import { Server } from "socket.io"
import Redis from 'ioredis';

const serviceUri = "rediss://default************"

const pub = new Redis(serviceUri);
const sub = new Redis(serviceUri);


class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init socket service...");
        // console.log(process.env.AIVEN_KEY)
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: '*',
            },
        });
        sub.subscribe('MESSAGES')

    }

    public initListeners() {
        const io = this.io;
        console.log("Init socket listeners...");

        io.on('connect', socket => {
            console.log("New socket connected ", socket.id);

            socket.on('event:message', async ({ message }: { message: string }) => {
                console.log('New message received: ', message)
                // Publish to caching 
                await pub.publish("MESSAGES", JSON.stringify({message}));
            });
        });
        sub.on("message", (channel, message) => {
            if (channel === 'MESSAGES') {
                console.log("New message from redis: ", message)
                io.emit("message", message);
            }
        });
    }

    get io() {
        return this._io;
    }
}

export default SocketService;