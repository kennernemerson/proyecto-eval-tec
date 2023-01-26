package com.kenner.medios.controller;

import com.kenner.medios.exception.ResourceNotFoundException;
import com.kenner.medios.model.Plan;
import com.kenner.medios.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class PlanController {

    @Autowired
    PlanRepository planRepository;

    @GetMapping("/planes")
    public List<Plan> getAllplanes() {
        return planRepository.findAll();
    }

    @PostMapping("/planes")
    public Plan createPlan(@Valid @RequestBody Plan plan) {
        return planRepository.save(plan);
    }

    @GetMapping("/planes/{id}")
    public Plan getPlanById(@PathVariable(value = "id") int id) {
        return planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan", "id", id));
    }

    @PutMapping("/planes/{id}")
    public Plan updatePlan(@PathVariable(value = "id") int id,
                                           @Valid @RequestBody Plan planDetails) {

        Plan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan", "id", id));

        plan.setPlan_medio(planDetails.getPlan_medio());
        plan.setCliente(planDetails.getCliente());
        plan.setCampania(planDetails.getCampania());

        Plan updatedPlan = planRepository.save(plan);
        return updatedPlan;
    }

    @DeleteMapping("/planes/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable(value = "id") int id) {
        Plan plan = planRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan", "id", id));

        planRepository.delete(plan);

        return ResponseEntity.ok().build();
    }
}
