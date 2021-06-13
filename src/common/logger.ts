import winston from 'winston'

class Logger {
    winstonLogger: winston.Logger;

    constructor(){
        this.winstonLogger = winston.createLogger({
            transports: [
              new winston.transports.Console(),
              new winston.transports.File({ filename: './logs/combined.log' }),
              new winston.transports.File({ filename: './logs/error.log', level: 'error' })
            ]
          });
    }

    logError(message: string, ...optionalParams: any[]) {

        this.winstonLogger.error(message, optionalParams);
    }

    logWarn(message: string,  ...optionalParams: any[]) {
        this.winstonLogger.warn(message, optionalParams);
    }

    logInfo(message: string, ...optionalParams: any[]) {
        this.winstonLogger.info(message, optionalParams);
    }

    _serializeIfNotEmpty(optionalParams: any[]) {
        optionalParams = optionalParams.filter(it => it);
        if (optionalParams.length == 0) return '';
        return optionalParams.reduce((current, acc) => acc + "\n" + current.toString());
    }
}

const logger = new Logger();

export default logger;