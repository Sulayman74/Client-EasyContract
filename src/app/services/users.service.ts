import { Observable, Subject } from 'rxjs';

import { Entreprise } from '../models/entreprise';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Salarie } from '../models/salarie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private _apiUrl = `${environment.API_URL}/api/users`

  currentUser = new Subject<any>()
  loggedUser = new Subject<any>()

  constructor(
    private _http: HttpClient
  ) { }

  getProfileWorker(): Observable<any> {
    return this._http.get(`${this._apiUrl}/profileWorker`)
  }

  getProfileSociety(): Observable<any> {
    return this._http.get(`${this._apiUrl}/profileSociety`)
  }

  clearToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  setRole(role: string) {
    localStorage.setItem('role', role)
  }
  setToken(token: string) {
    localStorage.setItem('token', token)

  }

  isAuthenticated(): boolean {
    const isAuth = localStorage.getItem('token')
    return !!isAuth
  }

  getRole(): boolean {
    const role: boolean = (localStorage.getItem('role') == 'true')
    return role
  }

  setCurrentUser(user: any): void {
    this.currentUser.next(user)
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable()
  }

  setLoggedUser(utilisateur: any) {
    this.loggedUser.next(utilisateur)
  }
  getLoggedUser(): Observable<any> {
    return this.loggedUser.asObservable()
  }


  //** les CRUD en front pour les requêtes dans la base de données */


  // **  Je recupère tous les utilisateurs */
  getAllUsers(): Observable<any> {
    return this._http.get(`${this._apiUrl}/allUsers`)

  }

  // **  Je recupère tous les salaries*/
  getWorkers(): Observable<any> {
    return this._http.get(`${this._apiUrl}/workers`)

  }
  // **  Je recupère toutes les entreprises  */

  getSocieties(): Observable<any> {
    return this._http.get(`${this._apiUrl}/societies`)
  }

  // ** ------------ LOGIN -------------------- ** //

  loginEntreprise(log: Entreprise): Observable<any> {
    // console.log(log);
    return this._http.post(`${this._apiUrl}/loginSociety`, log)
  }
  loginSalarie(log: Salarie): Observable<any> {
    // console.log(log);
    return this._http.post(`${this._apiUrl}/loginWorker`, log)
  }


  // ------------ REGISTER -------------------- //
  registerSalarie(salarie: Salarie): Observable<any> {
    // console.log(salarie, "Test du register 1");
    return this._http.post(`${this._apiUrl}/registerWorker`, salarie)

  }
  registerSociety(society: any): Observable<any> {
    // console.log(society, "Test du register 2");
    return this._http.post(`${this._apiUrl}/registerSociety`, society)

  }

  // **---------------------- UPDATE ------------------- */

  updateSalarie(salarie: Salarie): Observable<any> {
    // console.log("test update salarié",salarie);
    return this._http.put<Salarie>(`${this._apiUrl}/updateWorker`, salarie)
  }
  updateSociety(society: Entreprise): Observable<any> {
    // console.log("test update entreprise",society);
    return this._http.put<Entreprise>(`${this._apiUrl}/updateSociety`, society)
  }

}
