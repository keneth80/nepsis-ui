import {environment} from '../../../environments/environment';

export class BaseEndpointService {

  private PRE_FIX: string = 'api';

  private id: string;

  constructor(private serviceId: string) {
    this.id = serviceId;
  }

  get root() {
    return `${environment.serverUrl}`;
  }

  get prefix() {
    return `${environment.serverUrl}/${this.PRE_FIX}/${this.id}`;
  }

  queryString(params: any) {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
  }
}
