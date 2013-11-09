'use strict';

exports = module.exports = {

    development: {
        logger: {
            level: 'debug'
        },
        mongo: {
            db: 'nko4_lozi_development'
        },
        redis: {
            db: 'nko4_lozi_development'
        },
        session: {
            secret: '&{XkAp63x#$=Bw*cjEJ|0<Y+I4~@(0,WKF#nVEI>VkZz`P-vz+3![^3f`C&[>?L#'
        },
        cookie: {
            secret: ';a7.rPghehP/R8i>+qi]^cz.oups{b^j?-LgB>lgU-R-sZz|kSuY0U<,vPy{IB2e'
        },
        passport: {
            facebook: {
                clientID: '1411112085787855',
                clientSecret: '4bc77a42f3cb3671ffe0fd63393100c5'
            }
        }
    },

    production: {
        port: 80,
        mongo: {
            db: 'nko4_lozi'
        },
        redis: {
            db: 'nko4_lozi'
        },
        session: {
            secret: '^uF6oC2+z;DPg<:N1|+>&{J3xd/|@-(6DKRh&XW+,jvv}0+#O)lCHNfV!j$qwT`O'
        },
        cookie: {
            secret: '=_-K%tR K_hN nJQ]GtSRs:@hb3 b|C$Rs4#8*_}scz3yKj9uRG|17ly9k(Qp 0w'
        },
        passport: {
            facebook: {
                clientID: '234631683367403',
                clientSecret: 'a486b468339c5fc54bb5dbc3560812df'
            }
        }
    }

};
