// The default name for the field to lookup when using the finders.
Mongo.Collection.prototype._nameField = "name";

/**
 * @summary Finds the first document that matches the given name, as ordered by sort and skip options.
 * @locus Anywhere
 * @method findByName
 * @memberOf Mongo.Collection
 * @instance
 * @param {String} name The name of the document to find.
 * @param {Object} [options]
 * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)
 * @param {Number} options.skip Number of results to skip at the beginning
 * @param {MongoFieldSpecifier} options.fields Dictionary of fields to return or exclude.
 * @param {Boolean} options.reactive (Client only) Default true; pass false to disable reactivity
 * @param {Function} options.transform Overrides `transform` on the [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
 * @returns {Object}
 */
Mongo.Collection.prototype.findByName = function(name/*, options*/) {
  if (name === undefined) {
    throw new Meteor.Error("invalid-parameters");
  }

  let selector = {};

  selector[this._nameField] = name;

  let argArray = _.toArray(arguments);

  return this._collection.findOne(selector, this._getFindOptions(argArray));
};


/**
 * @summary Finds the ID of the first document that matches the given name, as ordered by sort and skip options.
 * @locus Anywhere
 * @method findIdByName
 * @memberOf Mongo.Collection
 * @instance
 * @param {String} name The name of the document to find.
 * @param {Object} [options]
 * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)
 * @param {Number} options.skip Number of results to skip at the beginning
 * @param {Boolean} options.reactive (Client only) Default true; pass false to disable reactivity
 * @param {Function} options.transform Overrides `transform` on the [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
 * @return {String}
 */
Mongo.Collection.prototype.findIdByName = function(name/*, options*/) {
  let selector = {};

  if (name === undefined) {
    throw new Meteor.Error("invalid-parameters");
  }

  selector[this._nameField] = name;

  let argArray = _.toArray(arguments);
  let options  = this._getFindOptions(argArray);

  options.fields = { _id: 1 };

  let doc = this._collection.findOne(selector, options);

  return doc && doc._id;
};

/**
 * @summary Finds the name of the first document that matches the given id, as ordered by sort and skip options.
 * @locus Anywhere
 * @method findNameById
 * @memberOf Mongo.Collection
 * @instance
 * @param {String} id The ID of the document to find.
 * @param {Object} [options]
 * @param {MongoSortSpecifier} options.sort Sort order (default: natural order)
 * @param {Number} options.skip Number of results to skip at the beginning
 * @param {Boolean} options.reactive (Client only) Default true; pass false to disable reactivity
 * @param {Function} options.transform Overrides `transform` on the [`Collection`](#collections) for this cursor.  Pass `null` to disable transformation.
 * @return {String}
 */
Mongo.Collection.prototype.findNameById = function(id/*, options*/) {
  if (id === undefined) {
    throw new Meteor.Error("invalid-parameters");
  }

  let argArray = _.toArray(arguments);
  let options  = this._getFindOptions(argArray);

  options.fields = {};
  options.fields[this._nameField] = 1;

  let doc = this._collection.findOne(id, options);

  return doc && doc[this._nameField];
};
