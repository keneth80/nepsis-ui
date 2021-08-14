import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  birthDate: string;
  hireDate: string;
  notes: string;
  address: string;
  phone: string;
  email: string;
}

let employee : Employee = {
  id: 1,
  firstName: 'John',
  lastName: 'Heart',
  position: 'CEO',
  birthDate: '1964/03/16',
  hireDate: '1995/01/15',
  notes: 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
  address: '351 S Hill St., Los Angeles, CA',
  phone: '360-684-1334',
  email: 'jheart@dx-email.com'
};

let positions : string[] = [
  'HR Manager',
  'IT Manager',
  'CEO',
  'Controller',
  'Sales Manager',
  'Support Manager',
  'Shipping Manager'
];

@Injectable()
export class Service {
  getEmployee() : Employee {
    return employee;
  }

  getPositions() : string[] {
    return positions
  }
}
