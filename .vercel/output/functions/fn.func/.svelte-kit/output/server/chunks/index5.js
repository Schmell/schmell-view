import { createId } from "@paralleldrive/cuid2";
import { a as formatTime } from "./formatters.js";
import { p as prisma } from "./prisma.js";
import { f as fail } from "./index.js";
import { Prisma } from "@prisma/client";
class Blw {
  data;
  file;
  constructor(props) {
    this.data = props.data;
    this.file = props.file;
    this.data.cuid = createId();
  }
  getComps() {
    const compData = [];
    const compBoats = this.data.filter((item) => {
      return item[0] === "comphigh";
    });
    compBoats.sort().forEach((compBoat) => {
      let competitor = {
        compId: ""
        // uniqueCompId: ''
      };
      competitor.compId = `${compBoat[2]}-${this.data.cuid}`;
      let compRows = this.data.filter((item) => {
        if (!item[0])
          return false;
        var regex = new RegExp(`^comp`, "g");
        return item[0].match(regex) && item[2] === compBoat[2];
      });
      compRows.forEach((item) => {
        const newName = item[0].replace("comp", "");
        competitor[newName] = item[1] ?? "";
      });
      compData.push(competitor);
    });
    return compData;
  }
  // getComps
  getResults(raceId) {
    const resultsArr = [];
    const results = this.data.filter((item) => {
      return item[0] === "rdisc" && item[3] === raceId;
    });
    results.forEach((result) => {
      const resultRow = {
        raceCompId: `${result[3]}-${result[2]}`,
        compId: `${result[2]}-${this.data.cuid}`,
        finish: this.resultHelp("rft", this.data, result) ?? "",
        start: this.resultHelp("rst", this.data, result) ?? "",
        points: this.resultHelp("rpts", this.data, result) ?? "",
        position: this.resultHelp("rpos", this.data, result) ?? "",
        discard: this.resultHelp("rdisc", this.data, result) ?? "",
        corrected: this.resultHelp("rcor", this.data, result) ?? "",
        resultType: this.resultHelp("rrestyp", this.data, result) ?? "",
        code: this.resultHelp("rcod", this.data, result) ?? "",
        elapsed: this.resultHelp("rele", this.data, result) ?? "",
        supposedRating: this.resultHelp("srat", this.data, result) ?? "",
        elapsedWin: this.resultHelp("rewin", this.data, result) ?? "",
        ratingWin: this.resultHelp("rrwin", this.data, result) ?? "",
        rrset: this.resultHelp("rrset", this.data, result) ?? "",
        recordedPosition: this.resultHelp("rrecpos", this.data, result) ?? "",
        raceRating: this.resultHelp("rrat", this.data, result) ?? ""
      };
      resultsArr.push(resultRow);
    });
    return resultsArr;
  }
  // getResults
  resultHelp(resultTag, data, result) {
    let res = data.filter((item) => {
      return item[0] === resultTag && item[2] === result[2] && item[3] === result[3];
    });
    if (res[0]) {
      return res[0][1];
    } else {
      return "";
    }
  }
  getRacesIds(uniqueIdString) {
  }
  getRaces(uniqueIdString) {
    let raceData = [];
    const races = this.data.filter((item) => {
      return item[0] === "racerank";
    });
    races.forEach((race) => {
      let raceObj = {
        raceId: "",
        uniqueRaceString: "",
        starts: "",
        name: "",
        rank: ""
      };
      raceObj.raceId = race[3];
      raceObj.uniqueRaceString = uniqueIdString + "_" + race[3];
      let resultRows = this.data.filter((item) => {
        if (!item[0])
          return false;
        var regex = new RegExp(`^race`, "g");
        return item[0].match(regex) && item[3] === race[3];
      });
      let raceStarts = [];
      resultRows.forEach((item) => {
        if (item[0] === "racestart") {
          const racestartString = item[1].split("|");
          let fleet = racestartString[0].split("^");
          let start = racestartString[1];
          let finishType = racestartString[2] ?? "";
          let startName = racestartString[3] ?? "";
          let raceDistance = racestartString[4] ?? "";
          let course = racestartString[9] ?? "";
          let avgWind = racestartString[10] ?? "";
          let windDir = racestartString[4] ?? "";
          if (!fleet)
            fleet = "none";
          try {
            start = formatTime(start);
          } catch {
            start = "";
          }
          raceStarts.push({
            fleet,
            start,
            finishType,
            startName,
            raceDistance,
            course,
            avgWind,
            windDir
          });
        } else {
          const property = item[0].replace("race", "");
          raceObj[property] = item[1];
        }
      });
      raceStarts.forEach(() => {
        raceObj.starts = raceStarts;
      });
      if (!raceObj.name) {
        raceObj.name = `Race ${raceObj.rank}`;
      }
      raceData.push(raceObj);
    });
    return raceData;
  }
  // getRaces
  getEvent() {
    const eventRows = this.data.filter((item) => {
      if (!item[0])
        return false;
      const regex = new RegExp(`^ser`, "g");
      return item[0].match(regex);
    });
    let eventObj = {
      event: "",
      eventwebsite: "",
      venue: "",
      eventeid: "",
      rest: {}
    };
    eventRows.forEach((item) => {
      const property = item[0].replace("ser", "");
      eventObj[property] = item[1];
    });
    const { event, eventwebsite, venue, eventeid, ...rest } = eventObj;
    const uniqueIdString = this.file?.name.toLowerCase().trim().split(" ").join("_");
    "-" + eventeid + "-" + event.toLowerCase().trim().split(" ").join("_");
    const name = event.length > 1 ? event : this.file?.name;
    return {
      name,
      eventwebsite,
      uniqueIdString,
      venueName: venue,
      eventeid,
      // venueemail: rest.venueemail,
      // venuewebsite: rest.venuewebsite,
      // venueburgee: rest.venueburgee,
      rest
    };
  }
  // getEvent()
  getScoring() {
    const rows = this.data.filter((item) => {
      if (!item[0])
        return false;
      const regex = new RegExp(`^scr`, "g");
      return item[0].match(regex);
    });
    let obj = {};
    rows.forEach((item) => {
      const property = item[0].replace("scr", "");
      obj[property] = item[1];
    });
    const { ratingsystem, ratsysa, ratsysb, ...rest } = obj;
    return {
      ratingsystem,
      ratsysa,
      ratsysb,
      rest
    };
  }
}
async function Populate({ blw, userId, orgId }) {
  const event = blw.getEvent();
  const { uniqueIdString } = event;
  function eventCreate() {
    const resultColumns = {
      rank: true,
      points: true,
      position: false,
      skipper: false,
      boat: true,
      sailno: false,
      finish: false,
      corrected: true,
      elapsed: false,
      nett: true,
      total: false
    };
    const { venueemail, venuewebsite, venueburgee } = event.rest;
    const eventObj = {
      // ...rest,
      ...event,
      resultColumns,
      Publisher: {
        connect: { id: userId }
      },
      Organization: {
        connect: { id: orgId }
      },
      Venue: {
        connectOrCreate: {
          where: { name: event.venueName },
          create: {
            name: event.venueName,
            email: venueemail,
            website: venuewebsite,
            burgee: venueburgee,
            Publisher: { connect: { id: userId } }
          }
        }
      }
    };
    return {
      where: { uniqueIdString },
      update: {},
      create: eventObj
    };
  }
  let racesArray = [];
  function racesCreate() {
    const compList = blw.getComps().map((comp) => {
      return { compId: comp.compId };
    });
    return blw.getRaces(uniqueIdString).map((race) => {
      const { rank, ...rest } = race;
      racesArray.push({ raceId: race.raceId, uniqueRaceString: race.uniqueRaceString });
      return {
        where: { uniqueRaceString: race.uniqueRaceString },
        update: { rank: Number(rank), ...rest },
        create: {
          rank: Number(rank),
          ...rest,
          Comps: {
            connect: compList
          },
          Event: {
            connect: { uniqueIdString }
          },
          Publisher: {
            connect: { id: userId }
          }
        }
      };
    });
  }
  function compsCreate() {
    return blw.getComps().map((comp) => {
      return {
        // where: { uniqueCompId: comp.uniqueCompId },
        where: { compId: comp.compId },
        update: {
          club: comp.club,
          boat: comp.boat,
          skipper: comp.helmname,
          // uniqueCompId: comp.uniqueCompId,
          fleet: comp.fleet,
          division: comp.division,
          rank: comp.rank,
          nett: comp.nett,
          total: comp.total,
          rating: comp.rating,
          rest: comp,
          Events: {
            connect: [{ uniqueIdString }]
          }
        },
        create: {
          compId: comp.compId,
          club: comp.club,
          boat: comp.boat,
          sailno: comp.sailno,
          skipper: comp.helmname,
          // uniqueCompId: comp.uniqueCompId,
          fleet: comp.fleet,
          division: comp.division,
          rank: comp.rank,
          nett: comp.nett,
          total: comp.total,
          rating: comp.rating,
          rest: comp,
          Events: {
            connect: [{ uniqueIdString }]
          },
          Publisher: {
            connect: { id: userId }
          }
        }
      };
    });
  }
  function resultsCreate() {
    return racesArray.map((race) => {
      return blw.getResults(race.raceId).map((result) => {
        return {
          resultId: result.resultId,
          raceCompId: result.raceCompId,
          fleet: result.fleet,
          start: result.start,
          finish: result.finish,
          points: result.points,
          position: result.position,
          resultType: result.resultType,
          code: result.code,
          discard: result.discard,
          elasped: result.elasped,
          corrected: result.corrected,
          elapsedWin: result.elapsedWin,
          ratingWin: result.ratingWin,
          Publisher: {
            connect: { id: userId }
          },
          Event: {
            connect: { uniqueIdString: event.uniqueIdString }
          },
          Comp: {
            connect: { compId: result.compId }
          },
          Race: {
            connect: { uniqueRaceString: race.uniqueRaceString }
          }
        };
      });
    });
  }
  return addTables();
  async function addTables() {
    const comps = compsCreate();
    const races = racesCreate();
    const resultsArray = resultsCreate();
    console.log("Start import");
    console.time("time");
    const { id: newEventId } = await prisma.event.upsert(eventCreate());
    console.timeLog("time", "event comlpete: ");
    await Promise.all(
      comps.map(async (comp) => {
        return await prisma.comp.upsert(comp);
      })
    );
    console.timeLog("time", "comps complete");
    await Promise.all(
      races.map(async (race) => {
        return await prisma.race.upsert(race);
      })
    );
    console.timeLog("time", "races comlpete: ");
    await Promise.all(
      resultsArray.map(async (results) => {
        results.map(async (result) => {
          const uniqueRaceId = `${result.raceCompId}-${newEventId}`;
          result.resultId = uniqueRaceId;
          try {
            return await prisma.result.upsert({
              where: { resultId: uniqueRaceId },
              update: { ...result },
              create: { ...result }
            });
          } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
              console.log(result);
              console.log(e.message);
            }
            return fail(400, { message: " Damn" });
          }
        });
      })
    );
    console.timeLog("time", "results comlpete ");
    console.timeEnd("time");
    return {
      success: true
    };
  }
}
export {
  Blw as B,
  Populate as P
};
