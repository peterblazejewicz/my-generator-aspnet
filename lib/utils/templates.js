'use strict';
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

const reg = /template_feed\/(.*)$/;

let config = null;
let files = [];
let itemTemplates = [];
let projectTemplates = [];
let templates = [];

/**
 * reads configuration from YAML file
 */
function getConfig() {
  if (!config) {
    try {
      config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../templates.yml'), 'utf8'), {json: true});
    } catch (error) {
      console.log(error);
    }
  }
  return config;
}

/**
 * list of all tempmlates
 * @returns {[]<Object>}
 */
let getAllTemplates = () => {
  if (templates.length === 0) {
    let config = getConfig();
    if (config) {
      templates = config
        .templates
        // filter out v.2 template projects
        .filter(template => template.includes('2.0') === false)
        .map(template => {
          let fullPath = path.resolve(__dirname, '../../', template.match(reg)[0]);
          let tpl = require(fullPath);
          return tpl;
        });
    }
  }
  return templates;
};

/**
 * list of all tempmlates
 * of type 'project'
 * @returns {[]<Object>}
 */
let getProjectTemplates = () => {
  if (projectTemplates.length === 0) {
    projectTemplates = getAllTemplates().filter(template => {
      return template.tags && template.tags.type === 'project';
    });
  }
  return projectTemplates;
};

/**
 * list of projects in formatted
 * as options for Yeoman prompts
 */
let getProjectChoices = () => {
  return getProjectTemplates()
    .map(template => {
      return {
        name: `${template.name} (${template.tags.language})`,
        value: {
          type: template.shortName,
          language: template.tags.language
        }
      };
    });
};

/**
 * list of all tempmlates
 * of type 'item'
 * @returns {[]<Object>}
 */
let getItemTemplates = () => {
  if (itemTemplates.length === 0) {
    itemTemplates = getAllTemplates().filter(template => {
      return template.tags && template.tags.type === 'item';
    });
  }
  return itemTemplates;
};

/**
 * list of all tempmlates urls
 * mapped to:
 * - target file location
 * - source url
 * @returns {[]<Object>}
 */
let mapFilesAndUrls = () => {
  let config = getConfig();
  if (config) {
    files = config
      .templates
      .map(template => {
        return {
          file: template.match(reg)[1],
          url: template
        };
      });
  }
  return files;
};

module.exports.getAllTemplates = getAllTemplates;
module.exports.getItemTemplates = getItemTemplates;
module.exports.getProjectChoices = getProjectChoices;
module.exports.getProjectTemplates = getProjectTemplates;
module.exports.mapFilesAndUrls = mapFilesAndUrls;
