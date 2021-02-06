class Logger {
  constructor(private readonly context: string) {}

  debug = (message: string, ...optionalParams: any[]) => {
    console.debug(`[${this.context}] ${message}:`, ...optionalParams);
  };

  info = (message: string, ...optionalParams: any[]) => {
    console.log(`[${this.context}] ${message}:`, ...optionalParams);
  };

  warn = (message: string, ...optionalParams: any[]) => {
    console.warn(`[${this.context}] ${message}:`, ...optionalParams);
  };

  error = (message: string, ...optionalParams: any[]) => {
    console.error(`[${this.context}] ${message}:`, ...optionalParams);
  };
}
export default Logger;
