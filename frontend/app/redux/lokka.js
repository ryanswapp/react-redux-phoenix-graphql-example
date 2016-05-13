import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';

const client = new Lokka({
  transport: new Transport('http://localhost:4000/graph')
});

export default client;
