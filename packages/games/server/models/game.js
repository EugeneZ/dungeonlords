'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orders = ['food', 'reputation', 'digging', 'gold', 'imps', 'traps', 'monsters', 'rooms'];

/**
 * Game Schema
 */
var GameSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    lastPlayed: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    players: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        color: {
            hex: String,
            name: String
        },
        score: {
            type: Number,
            default: 0
        },
        reputation: {
            type: Number,
            default: 0,
            min: -4,
            max: 10
        },
        deadLetterOffice: {
            type: Number,
            min: 0,
            default: 0
        },
        gold: {
            type: Number,
            min: 0,
            default: 3
        },
        food: {
            type: Number,
            min: 0,
            default: 3
        },
        imps: {
            type: Number,
            min: 0,
            default: 3
        },
        prisoners: [{
            paladin: Boolean,
            card: {
                type: String,
                enum: ['1','2','3'] // TODO
            }
        }],
        monsters: [{
            used: Boolean,
            combatOrder: Number,
            card: {
                type: String,
                enum: ['1', '2','3'] // TODO
            }
        }],
        traps: [{
            combatOrder: Number,
            card: {
                type: String,
                enum: ['1', '2', '3'] // TODO
            }
        }],
        adventurers: [{
            order: Number,
            paladin: Boolean,
            damage: Number,
            courage: Number,
            misc: String,
            card: {
                type: String,
                enum: ['1','2','3'] // TODO
            }
        }],
        dungeonTiles: [{
            row: {
                type: Number,
                min: 0,
                max: 3
            },
            column: {
                type: Number,
                min: 0,
                max: 4
            },
            conquered: Boolean,
            digging: Boolean,
            mining: Boolean,
            tunnel: Boolean,
            combat: Boolean,
            card: {
                type: String,
                enum: ['1','2','3'] // TODO
            },
            expansionCard: {
                type: String,
                enum: ['1','2','3'] // TODO
            }
        }],
        order1: {
            type: String,
            enum: orders
        },
        order2: {
            type: String,
            enum: orders
        },
        order3: {
            type: String,
            enum: orders
        },
        orderLast2: {
            type: String,
            enum: orders
        },
        orderLast3: {
            type: String,
            enum: orders
        }
    }],

    initial: {
        monsters1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        monsters2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        adventurers1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        adventurers2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        traps: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        combatEvents1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        combatEvents2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        yearlyEvents: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        rooms1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        rooms2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }]
    },
    stacks: {
        monsters1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        monsters2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        adventurers1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        adventurers2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        traps: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        combatEvents1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        combatEvents2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        yearlyEvents: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        rooms1: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }],
        rooms2: [{
            type: String,
            enum: ['1','2','3'] // TODO
        }]
    }
});

/**
 * Validations
 */
GameSchema.path('title').validate(function(title) {
    return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
GameSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('owner', 'name username').populate('players.user', 'name').exec(cb);
};

mongoose.model('Game', GameSchema);
