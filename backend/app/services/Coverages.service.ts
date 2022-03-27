import Coverage from '../models/Coverage';
import AbstractService from "./Abstract.service";

/**
 *  Esta clase controla peticiones a DB 
 *  relacionadas con tabla de Coverturas  
 */
class CoveragesService extends AbstractService {

  public constructor() { super() }

  async listAll() {

    try {
      const coverages = await Coverage.findAll({
        attributes: { exclude: ['picture', 'state'] },
        where: { state: true }
      });

      this.result = { status: 200, list: coverages }

    } catch (error) {
      this.result = { status: 500, message: 'Surgió un error al obtener los datos' }

    } finally {
      return this.result;
    }

  }

  async listById(id: number) {

    try {
      const coverage = await Coverage.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { id: id, state: true }
      });

      if (!coverage) {
        this.result = { status: 404, message: `No se encontró la covertura con id ${id}` };

      } else {
        this.result = { status: 200, item: coverage }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener la covertura` }

    } finally {
      return this.result;
    }
  }

  async listByName(name: string) {

    try {
      const coverage = await Coverage.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { name: name, state: true }
      });

      if (!coverage) {
        this.result = { status: 404, message: `No se encontró la covertura con el nombre ${name}` };

      } else {
        this.result = { status: 200, item: coverage }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener la covertura` }

    } finally {
      return this.result;
    }
  }


  async insert(name: String, picture: Buffer) {
    try {
      const cover = Coverage.build({ name: name, picture: picture });
      const res = await cover.save();
      this.result = { status: 200, item: res };
    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al guardar la covertura` }

    } finally {
      return this.result;
    }
  }

  async delete(id: number) {

    try {
      const coverage = await Coverage.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { id: id, state: true }
      });

      if (coverage) {

        await coverage.update({ state: false })
        this.result = { status: 200, item: coverage }

      } else {
        this.result = { status: 404, message: `No se encontró la covertura con id ${id}` }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al eliminar la covertura` }
    } finally {
      return this.result
    }


  }

  async update(id: number, name: String, picture: Buffer) {

    try {
      const coverage = await Coverage.findOne({
        attributes: { exclude: ['picture', 'state'] },
        where: { id: id, state: true }
      });

      if (coverage) {

        !!picture ?
          await coverage.update({ name: name, picture: picture }) :
          await coverage.update({ name: name });
        
        this.result = { status: 200, item: coverage }

      } else {
        this.result = { status: 404, message: `No se encontró la covertura con id ${id}` }
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al modificar la covertura` }

    } finally {
      return this.result
    }
  }

  async imageById(id: number) {

    try {
      const coverage: any = await Coverage.findOne({
        attributes: { include: ['picture'] },
        where: { id: id, state: true }
      });

      if (!coverage) {
        this.result = { status: 404, message: `No se encontró la covertura con id ${id}` };

      } else {
        this.result = { status: 200, item: `data:image/webp;base64,${coverage.picture.toString('base64')}` };
      }

    } catch (error) {
      this.result = { status: 500, message: `Surgió un error al obtener la covertura` }

    } finally {
      return this.result;
    }
  }
}

export default CoveragesService;