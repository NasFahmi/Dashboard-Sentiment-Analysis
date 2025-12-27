export const HomeRepository = {
  list: async (params?: VehicleListParams): Promise<{ data: Vehicle[]; total: number }> => {
    const response = await api.get('/vehicles', { params });
    return response.data;
  },
  getById: async (id: number): Promise<Vehicle> => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  create: async (payload: CreateVehiclePayload): Promise<Vehicle> => {
    const response = await api.post('/vehicles', payload);
    return response.data;
  },
  update: async (id: number, payload: Partial<CreateVehiclePayload>): Promise<Vehicle> => {
    const response = await api.put(`/vehicles/${id}`, payload);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },
  // Domain-specific operations
  assignDriver: async (vehicleId: number, driverId: number): Promise<Vehicle> => {
    const response = await api.post(`/vehicles/${vehicleId}/assign`, { driverId });
    return response.data;
  },
};
