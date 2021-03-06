export {Message, Request, Response, WebsocketResult, Callback, Connection}

class Connection {
  public wsURI: string;

  constructor(public username: string,
              public offline: boolean,
              public key?: number[],
              public host?: string,
              public port?: number,
              public pingPort?: number) {
    if (!this.offline) {
      this.wsURI = `wss://${this.host}:${this.port}`;
    }
  };
}

interface Message {
  [index: string]: any;
  // type: string;
  // project?: string;
  // question?: string;
  // folder?: string;
  // pid?: number;
  // file?: string;
  // tests?: Array<string>;
  // source?: string;
  // contents?: string;
  // encoding?: string;
  // normalize?: boolean;
  // template?: string;
  // history?: History | false;
  // oldName?: string;
  // newName?: string;
  // settings?: Settings;
  // assn?: string;
  // subdir?: string | false;
  // location?: string | false;
  // response?: ArrayBuffer[];
  // projects?: Array<string>;
  // files?: Array<string>;
  // changes?: Array<Change>;
  // type     = msg && msg.type;
  // project  = msg && msg.project;
  // question = msg && msg.question;
  // pid      = msg && msg.pid;
  // file     = msg && msg.file;
  // tests    = msg && msg.tests;
  // response = msg && msg.response;
}

class Request<T> {
  [index: string]: any;
  public time: number;
  public received: Promise<T>; // resolves when the response message is received
  public resolve: (value?: T | PromiseLike<T> | undefined) => void;
  public reject: (reason: any) => void;
  constructor(public message: Message) {
    this.time = Date.now();
    this.received = new Promise<T>((s, f) => {
      this.resolve = s;
      this.reject  = f;
    });
  }
}

interface WebsocketResult extends Message {
  newProjects: Array<string>;
  deletedProjects: Array<string>;
  updatedProjects: Array<string>;
}

class Response {
  id: number;
  success: boolean;
  result: WebsocketResult;
}

class Callback {
  constructor(public type: string, public cb: (message?: any) => any, public now: boolean) { }
}
