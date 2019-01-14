const fs = require('fs')
const { readFiles, mkdirp } = require('./util')
const form = require('../storage/forms/submit.json')

const getFolderPath = '../storage/forms/'

const mergeFiles = path =>
  readFiles(path).then(files => {
    const forms = []
    files.forEach((item, index) => {
      const content = JSON.parse(item.content)
      if (!content.name) return
      forms.push(content)
    })
    return { forms }
  })

const resolvers = {
  Mutation: {
    async deleteForms(_, { formId }, ctx) {
      // DONE
      try {
        const path = `${getFolderPath}${formId}.json`

        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }

        const forms = await mergeFiles(getFolderPath)

        return forms
      } catch (err) {
        throw new Error(err)
      }
    },
    async deleteFormElement(_, { formId, elementId }, ctx) {
      // DONE
      try {
        const path = `${getFolderPath}/${formId}.json`
        const forms = JSON.parse(fs.readFileSync(path, 'utf8'))

        if (forms.children) {
          const children = forms.children.filter(el => el.id !== elementId)
          forms.children = children
          fs.writeFileSync(path, JSON.stringify(forms))
        }

        const form = await mergeFiles(getFolderPath)
        return form
      } catch (err) {
        throw new Error(err)
      }
    },
    async createForm(_, { form }, ctx) {
      // DONE
      try {
        form = JSON.parse(form)

        const path = `${getFolderPath}/${form.id}.json`

        if (!fs.existsSync(path)) {
          mkdirp(getFolderPath)
          fs.writeFileSync(path, JSON.stringify(form))
        }

        const forms = await mergeFiles(getFolderPath)

        return forms
      } catch (err) {
        throw new Error(err)
      }
    },
    async updateForm(_, { form, id }, ctx) {
      // DONE
      form = JSON.parse(form)
      try {
        let path = `${getFolderPath}${id}.json`

        if (fs.existsSync(path)) {
          let forms = JSON.parse(fs.readFileSync(path, 'utf8'))
          forms = Object.assign(forms, form)
          form = forms
          if (id !== form.id) {
            fs.unlinkSync(path)
            path = `${getFolderPath}${form.id}.json`
          }
        }

        fs.writeFileSync(path, JSON.stringify(form))

        const forms = await mergeFiles(getFolderPath)

        return forms
      } catch (err) {
        throw new Error(err)
      }
    },
    async updateFormElements(_, { form, formId }, ctx) {
      // DONE
      const { children } = JSON.parse(form)
      try {
        const path = `${getFolderPath}${formId}.json`
        const forms = JSON.parse(fs.readFileSync(path, 'utf8'))
        if (!forms.children) {
          forms.children = [children]
        } else if (forms.children.some(e => e.id === children.id)) {
          const FormChildren = forms.children.map(value =>
            value.id === children.id ? children : value,
          )
          forms.children = FormChildren
        } else {
          forms.children.push(children)
        }

        fs.writeFileSync(path, JSON.stringify(forms))
        const form = await mergeFiles(getFolderPath)
        return form
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Query: {
    async getFile() {
      return form
    },
    async getForms() {
      try {
        mkdirp(getFolderPath)
        const { forms } = await mergeFiles(getFolderPath)
        return forms
      } catch (err) {
        throw new Error(err)
      }
    },
    async getForm(_, { formId }, ctx) {
      try {
        const path = `${getFolderPath}${formId}.json`
        const forms = JSON.parse(fs.readFileSync(path, 'utf8'))

        return forms
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}

module.exports = resolvers
