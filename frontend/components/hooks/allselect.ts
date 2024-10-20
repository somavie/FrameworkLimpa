import { useEffect, useState } from "react";
import api from "@/helpers/api";
import {
  Servico,
  Usuario,
  MatriculaType,
  Endereco,
  ProvinciaType,
  FuncionarioType,
  CursoType,
  ClasseType,
  TurnoType,
  SalaType,
  ProfessorType,
  AnoLetivoType,
  CargoType,
  EpocaType,
  TipoUsuarioType,
  PessoaType,
  MatriculaForm,
  DisciplinaType,
  TipoProvaType,
  MunicipioType,
  EspecializacaoType,
  TurmaType,
} from "@/helpers/types"; // Atualize o caminho conforme necessário

export const useAllAnoLetivos = () => {
  const [anoLetivos, setAnoLetivos] = useState<AnoLetivoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnoLetivos = async () => {
      try {
        const response = await api.get("/anoletivos"); // Ajuste a URL conforme necessário
        setAnoLetivos(response.data);
      } catch (err) {
        setError("Erro ao carregar anos letivos");
      } finally {
        setLoading(false);
      }
    };

    fetchAnoLetivos();
  }, []);

  return { anoLetivos, loading, error };
};
export const useAllPessoas = () => {
  const [pessoas, setPessoas] = useState<PessoaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await api.get("/pessoas");
        setPessoas(response.data);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoas();
  }, []);

  return { pessoas, loading };
};

export const useAllTiposUsuarios = () => {
  const [tiposUsuario, setTiposUsuario] = useState<TipoUsuarioType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
        const response = await api.get("/tipousuarios");
        setTiposUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar tipos de usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposUsuario();
  }, []);

  return { tiposUsuario, loading };
};

export const useFetchTiposUsuario = () => {
  const [tiposUsuario, setTiposUsuario] = useState<TipoUsuarioType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
        const response = await api.get("/tipousuarios");
        setTiposUsuario(response.data);
      } catch (error) {
        console.error("Erro ao buscar tipos de usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTiposUsuario();
  }, []);

  return { tiposUsuario, loading };
};

export const useFetchUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("/auth"); // Ajuste a URL conforme necessário
        setUsuarios(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return { usuarios, loading, error };
};

export const useAllMatriculas = () => {
  const [matricula, setMatricula] = useState<MatriculaForm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const response = await api.get("/matriculas"); // Ajuste a URL conforme necessário
        setMatricula(response.data);
      } catch (err) {
        setError("Erro ao carregar aluno");
      } finally {
        setLoading(false);
      }
    };

    fetchMatriculas();
  }, []);

  return { matricula, loading, error };
};

export const useAllServicos = () => {
  const [servico, setServico] = useState<Servico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get("/servicos"); // Ajuste a URL conforme necessário
        setServico(response.data);
      } catch (err) {
        setError("Erro ao carregar serviço");
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  return { servico, loading, error };
};

export const useAllEnderecos = () => {
  const [endereco, setEndereco] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get("/enderecos"); // Ajuste a URL conforme necessário
        setEndereco(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  return { endereco, loading, error };
};

export const useAllProvincias = () => {
  const [provincias, setProvincias] = useState<ProvinciaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await api.get("/provincias"); // Ajuste a URL conforme necessário
        setProvincias(response.data);
      } catch (err) {
        setError("Erro ao carregar províncias");
      } finally {
        setLoading(false);
      }
    };

    fetchProvincias();
  }, []);

  return { provincias, loading, error };
};
export const useAllMunicipios = () => {
  const [municipios, setMunicipios] = useState<MunicipioType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await api.get("/municipios"); // Ajuste a URL conforme necessário
        setMunicipios(response.data);
      } catch (err) {
        setError("Erro ao carregar províncias");
      } finally {
        setLoading(false);
      }
    };

    fetchMunicipios();
  }, []);

  return { municipios, loading, error };
};

export const useAllFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<FuncionarioType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get("/funcionarios"); // Ajuste a URL conforme necessário
        setFuncionarios(response.data);
      } catch (err) {
        setError("Erro ao carregar funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  return { funcionarios, loading, error };
};
export const useAllCargos = () => {
  const [cargos, setCargos] = useState<CargoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await api.get("/cargos"); // Ajuste a URL conforme necessário
        setCargos(response.data);
      } catch (err) {
        setError("Erro ao carregar funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchCargos();
  }, []);

  return { cargos, loading, error };
};
export const useAllCursos = () => {
  const [cursos, setCursos] = useState<CursoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get("/cursos"); // Ajuste a URL conforme necessário
        setCursos(response.data);
      } catch (err) {
        setError("Erro ao carregar funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return { cursos, loading, error };
};
export const useAllClasses = () => {
  const [classes, setClasses] = useState<ClasseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/classes"); // Ajuste a URL conforme necessário
        setClasses(response.data);
      } catch (err) {
        setError("Erro ao carregar funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { classes, loading, error };
};
export const useAllTurnos = () => {
  const [turnos, setTurnos] = useState<TurnoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await api.get("/turnos"); // Ajuste a URL conforme necessário
        setTurnos(response.data);
      } catch (err) {
        setError("Erro ao carregar funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, []);

  return { turnos, loading, error };
};

export const useAllSalas = () => {
  const [salas, setSalas] = useState<SalaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await api.get("/salas"); // Ajuste a URL conforme necessário
        setSalas(response.data);
      } catch (err) {
        setError("Erro ao carregar funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  return { salas, loading, error };
};

export const useAllProfessores = () => {
  const [professor, setProfessor] = useState<ProfessorType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await api.get("/Professores"); // Ajuste a URL conforme necessário
        setProfessor(response.data);
      } catch (err) {
        setError("Erro ao carregar funcionários");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessor();
  }, []);

  return { professor, loading, error };
};

export const useAllDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState<DisciplinaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const { data } = await api.get("/disciplinas");
        setDisciplinas(data);
      } catch (error) {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplinas();
  }, []);

  return { disciplinas, loading, error };
};

export const useAllTipoProvas = () => {
  const [tipoProvas, setTipoProvas] = useState<TipoProvaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchtipoprova = async () => {
      try {
        const { data } = await api.get("/tipoprovas");
        setTipoProvas(data);
      } catch (error) {
        setError("Erro ao buscar Tipo de Prova:");
      } finally {
        setLoading(false);
      }
    };

    fetchtipoprova();
  }, []);

  return { tipoProvas, loading, error };
};

export const useAllClasseDisciplina = () => {
  const [classeDisciplina, setClasseDisciplina] = useState<DisciplinaType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasseDisciplina = async () => {
      try {
        const { data } = await api.get("/classedisciplina");
        setClasseDisciplina(data);
      } catch (error) {
        console.error("Erro ao buscar relação classe-disciplina:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasseDisciplina();
  }, []);

  return { classeDisciplina, loading };
};

export const useAllTurmas = () => {
  const [turmas, setTurmas] = useState<TurmaType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurma = async () => {
      try {
        const { data } = await api.get("/turmas");
        setTurmas(data);
      } catch (error) {
        console.error("Erro ao buscar turmas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTurma();
  }, []);

  return { turmas, loading };
};

export const useAllEpocas = () => {
  const [epocas, setEpocas] = useState<EpocaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchEpoca = async () => {
      try {
        const { data } = await api.get("/epocas");
        setEpocas(data);
      } catch (error) {
        setError("Erro ao buscar Epocas");
      } finally {
        setLoading(false);
      }
    };

    fetchEpoca();
  }, []);

  return { epocas, loading, error };
};
export const useAllEspecializacoes = () => {
  const [especializacoes, setEspecializacoes] = useState<EspecializacaoType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEspecializacoes = async () => {
      try {
        const { data } = await api.get("/especializacoes");
        setEspecializacoes(data);
      } catch (error) {
        console.error("Erro ao buscar Especializacoes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecializacoes();
  }, []);

  return { especializacoes, loading };
};
export const useAllPossiveisEncarregados = () => {
  const [possiveisEncarregados, setPossiveisEncarregados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPossiveisEncarregados = async () => {
      try {
        const { data } = await api.get("/encarregados/possiveisEncarregados");
        setPossiveisEncarregados(data);
      } catch (error) {
        console.error("Erro ao buscar P Encarregados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPossiveisEncarregados();
  }, []);

  return { possiveisEncarregados, loading };
};
