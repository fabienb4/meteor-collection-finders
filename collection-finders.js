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
  var self = this;

  if (name === undefined)
    throw new Meteor.Error("invalid-parameters");

  var selector = {};

  selector[self._nameField] = name;

  var argArray = _.toArray(arguments);

  return self._collection.findOne(selector, self._getFindOptions(argArray));
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
  var self = this;
  var selector = {};

  if (name === undefined)
    throw new Meteor.Error("invalid-parameters");

  selector[self._nameField] = name;

  var argArray = _.toArray(arguments);
  var options  = self._getFindOptions(argArray);

  options.fields = { _id: 1 };

  var doc = self._collection.findOne(selector, options);

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
  var self = this;

  if (id === undefined)
    throw new Meteor.Error("invalid-parameters");

  var argArray = _.toArray(arguments);
  var options  = self._getFindOptions(argArray);

  options.fields = {};
  options.fields[self._nameField] = 1;

  var doc = self._collection.findOne(id, options);

  return doc && doc[self._nameField];
};
