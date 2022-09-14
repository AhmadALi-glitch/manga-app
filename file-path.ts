export default class FilePath {

    static workEnvironment = process.env.NODE_ENV;

    static get currentEnvironmentFilePath():string {
        if(this.workEnvironment == undefined) {
            return this.defaultEnvironmentFilePath;
        }
        return this.dynamicEnvironmentFilePath;
    }

    static get defaultEnvironmentFilePath():string{
        return `${__dirname}/config/.env`;
    }

    static get dynamicEnvironmentFilePath():string{
        return `${__dirname}/config/.env.${this.workEnvironment}`;
    }


}
