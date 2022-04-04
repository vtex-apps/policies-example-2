/* eslint-disable no-console */
import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class Formula1 extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('http://ergast.com/api/f1/2021', ctx, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'false',
      },
    })
  }

  public async getDrivers() {
    console.log('drivers')
    const drivers = await this.http.get('/driverStandings.json')

    if (drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings) {
      const driversInfos: DriversInfo[] = []

      drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(
        (element: any) => {
          driversInfos.push({
            name: element.Driver.givenName,
            lastName: element.Driver.familyName,
            points: parseFloat(element.points),
          })
        }
      )

      return driversInfos
    }

    return []
  }

  public async getConstructor() {
    const constructor = await this.http.get('/constructorStandings.json')

    console.log('teste')
    if (
      constructor.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
    ) {
      const constructorsInfos: ConstructorsInfos[] = []

      constructor.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.forEach(
        (element: any) => {
          constructorsInfos.push({
            name: element.Constructor.name,
            points: parseFloat(element.points),
          })
        }
      )

      return constructorsInfos
    }

    return []
  }
}
