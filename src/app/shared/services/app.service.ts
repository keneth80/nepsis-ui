import { Injectable } from '@angular/core';

export class Company {
  ID: number;
  CompanyName: string;
}

let companies: Company[] = [{
  "ID": 1,
  "CompanyName": "Super Mart of the West"
} ];

@Injectable()
export class Service {
  getCompanies(): Company[] {
    return companies;
  }
}
