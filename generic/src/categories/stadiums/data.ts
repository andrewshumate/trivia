import { standardizeString } from "../../generic/strings";

export enum NflTeam {
    LAS_VEGAS_RAIDERS,
    KANSAS_CITY_CHIEFS,
    DALLAS_COWBOYS,
    CAROLINA_PANTHERS,
    NEW_ORLEANS_SAINTS,
    DENVER_BRONCOS,
    WASHINGTON_FOOTBALL_TEAM,
    CLEVELAND_BROWNS,
    DETROIT_LIONS,
    NEW_ENGLAND_PATRIOTS,
    MIAMI_DOLPHINS,
    PITTSBURGH_STEELERS,
    BUFFALO_BILLS,
    GREEN_BAY_PACKERS,
    SAN_FRANCISCO_49ERS,
    PHILADELPHIA_EAGLES,
    INDIANAPOLIS_COLTS,
    SEATTLE_SEAHAWKS,
    BALTIMORE_RAVENS,
    ATLANTA_FALCONS,
    NEW_YORK_JETS,
    NEW_YORK_GIANTS,
    TENNESSEE_TITANS,
    HOUSTON_TEXANS,
    CINCINNATI_BENGALS,
    TAMPA_BAY_BUCCANEERS,
    LOS_ANGELES_RAMS,
    LOS_ANGELES_CHARGERS,
    CHICAGO_BEARS,
    ARIZONA_CARDINALS,
    JACKSONVILLE_JAGUARS,
    MINNESOTA_VIKINGS,
    // Not really "teams", but we need to show them
    NFL_MEXICO_GAME,
    HALL_OF_FAME_GAME,
    NFL_LONDON_GAME,
    NFL_LONDON_GAME2,
}

interface TeamInfo {
    stadiumNames: string[];
    cityNames: string[];
    teamNames: string[];
}

export function getTeamInfo(teamName: NflTeam): TeamInfo {
    switch (teamName) {
        case NflTeam.LAS_VEGAS_RAIDERS:
            return {
                stadiumNames: ["Allegiant Stadium", "Allegiant"],
                cityNames: ["Paradise, Nevada"],
                teamNames: ["Las Vegas Raiders", "Raiders"],
            };
        case NflTeam.KANSAS_CITY_CHIEFS:
            return {
                stadiumNames: [
                    "Geha Field at Arrowhead Stadium",
                    "Geha Field",
                    "Arrowhead Stadium",
                    "Geha",
                    "Arrowhead",
                ],
                cityNames: ["Kansas City, Missouri"],
                teamNames: ["Kansas City Chiefs", "Chiefs"],
            };
        case NflTeam.DALLAS_COWBOYS:
            return {
                stadiumNames: ["AT&T Stadium", "AT&T"],
                cityNames: ["Arlington, Texas"],
                teamNames: ["Dallas Cowboys", "Cowboys"],
            };
        case NflTeam.CAROLINA_PANTHERS:
            return {
                stadiumNames: ["Bank of America Stadium", "BOA stadium", "BOA", "Bank of America"],
                cityNames: ["Charlotte, North Carolina"],
                teamNames: ["Carolina Panthers", "Panthers"],
            };
        case NflTeam.NEW_ORLEANS_SAINTS:
            return {
                stadiumNames: ["Caesars Superdome", "Superdome"],
                cityNames: ["New Orleans, Louisiana"],
                teamNames: ["New Orleans Saints", "Saints"],
            };
        case NflTeam.DENVER_BRONCOS:
            return {
                stadiumNames: ["Empower Field at Mile High", "Mile High", "New Mile High", "Mile High Stadium"],
                cityNames: ["Denver, Colorado"],
                teamNames: ["Denver Broncos", "Broncos"],
            };
        case NflTeam.WASHINGTON_FOOTBALL_TEAM:
            return {
                stadiumNames: ["FedExField", "FedEx"],
                cityNames: ["Landover, Maryland"],
                teamNames: ["Washington Football Team", "Washington Football Team"],
            };
        case NflTeam.CLEVELAND_BROWNS:
            return {
                stadiumNames: ["FirstEnergy Stadium", "FirstEnergy"],
                cityNames: ["Cleveland, Ohio"],
                teamNames: ["Cleveland Browns", "Browns"],
            };
        case NflTeam.DETROIT_LIONS:
            return {
                stadiumNames: ["Ford Field", "Ford"],
                cityNames: ["Detroit, Michigan"],
                teamNames: ["Detroit Lions", "Lions"],
            };
        case NflTeam.NEW_ENGLAND_PATRIOTS:
            return {
                stadiumNames: ["Gillette Stadium", "Gillette"],
                cityNames: ["Foxborough, Massachusetts"],
                teamNames: ["New England Patriots", "Patriots"],
            };
        case NflTeam.MIAMI_DOLPHINS:
            return {
                stadiumNames: ["Hard Rock Stadium", "Hard Rock"],
                cityNames: ["Miami Gardens, Florida"],
                teamNames: ["Miami Dolphins", "Dolphins"],
            };
        case NflTeam.PITTSBURGH_STEELERS:
            return {
                stadiumNames: ["Heinz Field", "Heinz"],
                cityNames: ["Pittsburgh, Pennsylvania"],
                teamNames: ["Pittsburgh Steelers", "Steelers"],
            };
        case NflTeam.BUFFALO_BILLS:
            return {
                stadiumNames: ["Highmark Stadium", "Highmark"],
                cityNames: ["Orchard Park, New York"],
                teamNames: ["Buffalo Bills", "Bills"],
            };
        case NflTeam.GREEN_BAY_PACKERS:
            return {
                stadiumNames: ["Lambeau Field", "Lambeau"],
                cityNames: ["Green Bay, Wisconsin"],
                teamNames: ["Green Bay Packers", "Packers"],
            };
        case NflTeam.SAN_FRANCISCO_49ERS:
            return {
                stadiumNames: ["Levi's Stadium", "Levi's"],
                cityNames: ["Santa Clara, California"],
                teamNames: ["San Francisco 49ers", "49ers"],
            };
        case NflTeam.PHILADELPHIA_EAGLES:
            return {
                stadiumNames: ["Lincoln Financial Field", "Lincoln Financial", "Lincoln"],
                cityNames: ["Philadelphia, Pennsylvania"],
                teamNames: ["Philadelphia Eagles", "Eagles"],
            };
        case NflTeam.INDIANAPOLIS_COLTS:
            return {
                stadiumNames: ["Lucas Oil Stadium", "Lucas Oil"],
                cityNames: ["Indianapolis, Indiana"],
                teamNames: ["Indianapolis Colts", "Colts"],
            };
        case NflTeam.SEATTLE_SEAHAWKS:
            return {
                stadiumNames: ["Lumen Field", "Lumen"],
                cityNames: ["Seattle, Washington"],
                teamNames: ["Seattle Seahawks", "Seahawks"],
            };
        case NflTeam.BALTIMORE_RAVENS:
            return {
                stadiumNames: ["M&T Bank Stadium", "M&T Bank"],
                cityNames: ["Baltimore, Maryland"],
                teamNames: ["Baltimore Ravens", "Ravens"],
            };
        case NflTeam.ATLANTA_FALCONS:
            return {
                stadiumNames: ["Mercedes-Benz Stadium", "Mercedes", "Mercedes-Benz"],
                cityNames: ["Atlanta, Georgia"],
                teamNames: ["Atlanta Falcons", "Falcons"],
            };
        case NflTeam.NEW_YORK_GIANTS:
            return {
                stadiumNames: ["MetLife Stadium", "MetLife"],
                cityNames: ["East Rutherford, New Jersey"],
                teamNames: ["New York Giants", "Giants"],
            };
        case NflTeam.NEW_YORK_JETS:
            return {
                stadiumNames: ["MetLife Stadium", "MetLife"],
                cityNames: ["East Rutherford, New Jersey"],
                teamNames: ["New York Jets", "Jets"],
            };
        case NflTeam.TENNESSEE_TITANS:
            return {
                stadiumNames: ["Nissan Stadium", "Nissan"],
                cityNames: ["Nashville, Tennessee"],
                teamNames: ["Tennessee Titans", "Titans"],
            };
        case NflTeam.HOUSTON_TEXANS:
            return {
                stadiumNames: ["NRG Stadium", "NRG"],
                cityNames: ["Houston, Texas"],
                teamNames: ["Houston Texans", "Texans"],
            };
        case NflTeam.CINCINNATI_BENGALS:
            return {
                stadiumNames: ["Paul Brown Stadium", "Paul Brown"],
                cityNames: ["Cincinnati, Ohio"],
                teamNames: ["Cincinnati Bengals", "Bengals"],
            };
        case NflTeam.TAMPA_BAY_BUCCANEERS:
            return {
                stadiumNames: ["Raymond James Stadium", "Raymond James"],
                cityNames: ["Tampa, Florida"],
                teamNames: ["Tampa Bay Buccaneers", "Buccaneers"],
            };
        case NflTeam.LOS_ANGELES_RAMS:
            return {
                stadiumNames: ["SoFi Stadium", "SoFi"],
                cityNames: ["Inglewood, California"],
                teamNames: ["Los Angeles Rams", "Rams"],
            };
        case NflTeam.LOS_ANGELES_CHARGERS:
            return {
                stadiumNames: ["SoFi Stadium", "SoFi"],
                cityNames: ["Inglewood, California"],
                teamNames: ["Los Angeles Chargers", "Chargers"],
            };
        case NflTeam.CHICAGO_BEARS:
            return {
                stadiumNames: ["Soldier Field", "Soldier"],
                cityNames: ["Chicago, Illinois"],
                teamNames: ["Chicago Bears", "Bears"],
            };
        case NflTeam.ARIZONA_CARDINALS:
            return {
                stadiumNames: ["State Farm Stadium", "Start Farm"],
                cityNames: ["Glendale, Arizona"],
                teamNames: ["Arizona Cardinals", "Cardinals"],
            };
        case NflTeam.JACKSONVILLE_JAGUARS:
            return {
                stadiumNames: ["TIAA Bank Field", "TIAA Bank", "TIAA"],
                cityNames: ["Jacksonville, Florida"],
                teamNames: ["Jacksonville Jaguars", "Jaguars"],
            };
        case NflTeam.MINNESOTA_VIKINGS:
            return {
                stadiumNames: ["U.S. Bank Stadium", "U.S. Bank"],
                cityNames: ["Minneapolis, Minnesota"],
                teamNames: ["Minnesota Vikings", "Vikings"],
            };
        case NflTeam.NFL_MEXICO_GAME:
            return {
                stadiumNames: ["Estadio Azteca"],
                cityNames: ["Mexico City, Mexico"],
                teamNames: ["NFL Mexico Games", "NFL Mexico Games"],
            };
        case NflTeam.HALL_OF_FAME_GAME:
            return {
                stadiumNames: ["Tom Benson Hall of Fame Stadium", "Tom Benson Hall of Fame", "Tom Benson"],
                cityNames: ["Canton Ohio"],
                teamNames: ["Hall of Fame Games", "Hall of Fame Games"],
            };
        case NflTeam.NFL_LONDON_GAME:
            return {
                stadiumNames: ["Wembley Stadium", "Wembley"],
                cityNames: ["London, England"],
                teamNames: ["old NFL London Games", "old NFL London Games"],
            };
        case NflTeam.NFL_LONDON_GAME2:
            return {
                stadiumNames: ["Tottenham Hotspur Stadium", "Tottenham Hotspur"],
                cityNames: ["London, England"],
                teamNames: ["new NFL London Games", "new NFL London Games"],
            };
    }
}

export const allKeys = Object.values(NflTeam).filter((x): x is string => typeof x == "string");

function x(): Map<string, string> {
    const result: Map<string, string> = new Map();

    for (let i = 0; i < allKeys.length; i++) {
        const team = NflTeam[allKeys[i] as keyof typeof NflTeam];
        const teamInfo = getTeamInfo(team);

        for (let j = 0; j < teamInfo.stadiumNames.length; j++) {
            result.set(standardizeString(teamInfo.stadiumNames[j]), teamInfo.stadiumNames[0]);
        }
    }

    return result;
}

export const possibleGuessToOfficialGuess = x();

export function guessToKeys(guess: string): string[] {
    const result: string[] = [];

    for (let i = 0; i < allKeys.length; i++) {
        const team = NflTeam[allKeys[i] as keyof typeof NflTeam];
        const teamInfo = getTeamInfo(team);
        if (teamInfo.stadiumNames[0] === guess) result.push(allKeys[i]);
    }

    return result;
}
