
/**
 * Http Status Code
 */
export class HttpStatus {
    /**
     * 1xx Informational response
     */
    static Continue: 100;
    static SwitchingProtocols: 101;
    static Processing: 102;
    static EarlyHints: 103;

    /**
     * 2xx Success
     */
    static Ok: 200;
    static Created: 201;
    static Accepted: 202;
    static NonAuthoritativeInformation: 203;
    static NoContent: 204;
    static ResetContent: 205;
    static PartialContent: 206;
    static MultiStatus: 207;
    static AlreadyReported: 208;
    static IMUsed: 226;

    /**
     * 3xx Redirection
     */
    static MultipleChoices: 300;
    static MovedPermanently: 301;
    static Found: 302;
    static SeeOther: 303;
    static NotModified: 304;
    static UseProxy: 305;
    static SwitchProxy: 306;
    static TemporaryRedirect: 307;
    static PermanentRedirect: 308;

    /**
     * 4xx Client errors
     */
    static BadRequest: 400;
    static Unauthorized: 401;
    static PaymentRequired: 402;
    static Forbidden: 403;
    static NotFound: 404;
    static MethodNotAllowed: 405;
    static NotAcceptable: 406;
    static ProxyAuthenticationRequired: 407;
    static RequestTimeout: 408;
    static Conflict: 409;
    static Gone: 410;
    static LengthRequired: 411;
    static PreconditionFailed: 412;
    static PayloadTooLarge: 413;
    static URITooLong: 414;
    static UnsupportedMediaType: 415;
    static RangeNotSatisfiable: 416;
    static ExpectationFailed: 417;
    static IMATeapot: 418;
    static MisdirectedRequest: 421;
    static UnprocessableEntity: 422;
    static Locked: 423;
    static FailedDependency: 424;
    static TooEarly: 425;
    static UpgradeRequired: 426;
    static PreconditionRequired: 428;
    static TooManyRequests: 429;
    static RequestHeaderFieldsTooLarge: 431;
    static UnavailableForLegalReasons: 451;

    /**
     * 5xx Server errors
     */
    static InternalServerError: 500;
    static NotImplemented: 501;
    static BadGateway: 502;
    static ServiceUnavailable: 503;
    static GatewayTimeout: 504;
    static HTTPVersionNotSupported: 505;
    static VariantAlsoNegotiates: 506;
    static InsufficientStorage: 507;
    static LoopDetected: 508;
    static NotExtended: 510;
    static NetworkAuthenticationRequired: 511;
}

/**
 * Assign nested property in object
 * 
 * @param obj object
 * @param keyPath key path list
 * @param value value to assign
 */
export const assignNestedProperty: (obj: any, keyPath: string[], value: any) => void;

/**
 * Extract language tag
 * @param value language string
 */
export const extractLanguageTag: (value?: string | undefined) => string;

/**
 * Return 0 if the number in NaN and the number if not
 * @param value number
 */
export const forceNumber: (value: any) => number;

/**
 * Get if the given value is null or undefined
 * @param value input
 */
export const isFilled: (value: any) => boolean;

/**
 * Check if the locale string is valid
 * @param locale locale
 */
export const isLocaleValid: (locale?: string | undefined) => boolean;

/**
 * Get if the given value is null or undefined and length > 0
 * @param value input
 */
export const isQueryParamFilled: (value: any) => boolean;

/**
 * Return a value of a nested property (last key in the given path)
 * @param obj object
 * @param keyPath key path list
 */
export const readNestedProperty: (obj: any, keyPath: string[]) => any;

/**
 * Remove all white spaces in string
 * @param value string
 * @param replacement string that will replace the space
 */
export const removeAllWhiteSpaces: (value: string, replacement?: string | undefined) => string;

/**
 * Replace all occurences of a searched string in another string
 * 
 * @param value target string
 * @param search element to replace
 * @param replacement replacement
 */
export const replaceAllMatch: (value: string, search: RegExp, replacement: string) => string;