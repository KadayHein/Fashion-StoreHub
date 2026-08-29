package com.gdc.backend.util;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.metamodel.SingularAttribute;

public class CriteriaUtil {
	
	public static<T> Optional<Integer> maxNo(Class<T> entity, SingularAttribute<T, Integer> attr, EntityManager em) {
		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(Integer.class);
		var root = cq.from(entity);
		cq.select(cb.max(root.get(attr)));
		return Optional.ofNullable(
				em.createQuery(cq).getSingleResult());
	}
	
	public static<T> Optional<String> maxString(Class<T> entity, SingularAttribute<T, String> attr, EntityManager em) {
		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(String.class);
		var root = cq.from(entity);
		cq.select(root.get(attr))
		  .orderBy(cb.desc(root.get(attr)));
		return Optional.ofNullable(
				em.createQuery(cq).setMaxResults(1).getSingleResult());
	}

	
	public static<T> Optional<List<String>> select(Class<T> entity, SingularAttribute<T, String> column, EntityManager em){
		var cb = em.getCriteriaBuilder();
		var cq = cb.createQuery(String.class);
		var root = cq.from(entity);
		cq.select(root.get(column))
		  .orderBy(cb.desc(root.get(column)));
		return Optional.ofNullable(
				em.createQuery(cq).getResultList());
	}
		
	public static<T> Specification<T> where(SingularAttribute<T, String> fieldname, String condition, String value){

		return (root,cq,cb) -> switch(condition) {
			case "eq" -> cb.equal(root.get(fieldname), value);
			case "ct" -> cb.like(root.get(fieldname), "%"+value+"%");
			case "bw" -> cb.like(root.get(fieldname), value+"%");
			case "ew" -> cb.like(root.get(fieldname), "%"+value);
			default -> cb.equal(root.get(fieldname), value);
			};
	}
	
	public static<T> Specification<T> where(SingularAttribute<T, Integer> fieldname, String condition, Integer value1, Integer value2){

		return (root,cq,cb) -> switch(condition) {
			case "eq" -> cb.equal(root.get(fieldname), value1);
			case "gt" -> cb.greaterThan(root.get(fieldname), value1);
			case "lt" -> cb.lessThan(root.get(fieldname), value1);
			case "geq" -> cb.greaterThanOrEqualTo(root.get(fieldname), value1);
			case "leq" -> cb.lessThanOrEqualTo(root.get(fieldname), value1);
			case "bt" -> cb.between(root.get(fieldname), value1, value2);
			default -> cb.equal(root.get(fieldname), value1);
			};
	}
	
	public static<T> Specification<T> where(SingularAttribute<T, Double> fieldname, String condition, Double value1, Double value2){

		return (root,cq,cb) -> switch(condition) {
			case "eq" -> cb.equal(root.get(fieldname), value1);
			case "gt" -> cb.greaterThan(root.get(fieldname), value1);
			case "lt" -> cb.lessThan(root.get(fieldname), value1);
			case "geq" -> cb.greaterThanOrEqualTo(root.get(fieldname), value1);
			case "leq" -> cb.lessThanOrEqualTo(root.get(fieldname), value1);
			case "bt" -> cb.between(root.get(fieldname), value1, value2);
			default -> cb.equal(root.get(fieldname), value1);
			};
	}
	
	
	
	public static<T> Specification<T> where(SingularAttribute<T, LocalDate> fieldname, String condition, LocalDate value1, LocalDate value2){
		System.out.println(fieldname.getName()+", "+condition+", "+value1.getDayOfMonth()+" & "+value2.getDayOfMonth());
		return (root,cq,cb) -> switch(condition) {
			case "eq" -> cb.equal(root.get(fieldname), value1);
			case "gt" -> cb.greaterThan(root.get(fieldname), value1);
			case "lt" -> cb.lessThan(root.get(fieldname), value1);
			case "geq" -> cb.greaterThanOrEqualTo(root.get(fieldname), value1);
			case "leq" -> cb.lessThanOrEqualTo(root.get(fieldname), value1);
			case "bt" -> cb.between(root.get(fieldname), value1, value2);
			default -> cb.equal(root.get(fieldname), value1);
			};
	}
	public static<T> Specification<T> where(SingularAttribute<T, Byte> fieldname, Byte value){
		return (root,cq,cb) -> cb.equal(root.get(fieldname), value);
	}
	
	public static<T> Specification<T> whereEqual(SingularAttribute<T, String> fieldname, String value){
		return (root,cq,cb) -> cb.equal(root.get(fieldname), value);
	}
	
	public static<T> Specification<T> whereEqual(SingularAttribute<T, Integer> fieldname, Integer value){
		return (root,cq,cb) -> cb.equal(root.get(fieldname), value);
	}
	
	public static<T> Specification<T> whereHasLength(SingularAttribute<T, String> fieldname, int length){
		return (root,cq,cb) -> cb.equal(cb.length(root.get(fieldname)), length);
	}
	
	public static<T> Specification<T> whereLike(SingularAttribute<T, String> fieldname, String like){
		return (root,cq,cb) -> cb.like(cb.lower(root.get(fieldname)), "%"+like.toLowerCase()+"%");
	}
	
	public static<T> Specification<T> between(SingularAttribute<T, Integer> fieldname, Integer upperbound, Integer lowerbound){
		return (root,cq,cb) -> cb.between(root.get(fieldname), upperbound, lowerbound);
	}
	
	public static<T> Specification<T> between(SingularAttribute<T, LocalDate> fieldname, LocalDate upperbound, LocalDate lowerbound){
		return (root,cq,cb) -> cb.between(root.get(fieldname), upperbound, lowerbound);
	}
	
	public static<S,T,V> Specification<S> join2tbl(
			T target, String joinTo, 
			SingularAttribute<T, V> field2match, String condition, V value){

		return (root,cq,cb) -> {
			Join<S, T> join = root.join(joinTo);
			return switch(condition) {
			case "eq" -> cb.equal(join.get(field2match), value);
			case "c" -> cb.like(join.get(field2match).as(String.class), "%"+value+"%");
			case "bw" -> cb.like(join.get(field2match).as(String.class), value+"%");
			case "ew" -> cb.like(join.get(field2match).as(String.class), "%"+value);
			default -> cb.equal(join.get(field2match), value);
			};
		};
	}
	
	public static<S,J,T,V> Specification<S> join3tbl(
			SingularAttribute<S, J> firstJoin, 
			SingularAttribute<J, T> secondJoin, 
			SingularAttribute<T, V> field2match, String condition, V value){ // V = generic for field2match data type

		
		return (root,cq,cb) -> {
			Join<S, J> join1 = root.join(firstJoin);
			Join<J, T> join2 = join1.join(secondJoin);
			
			return switch(condition) {
			case "eq" -> cb.equal(join2.get(field2match), value);
			case "c" -> cb.like(join2.get(field2match).as(String.class), "%"+value+"%");
			case "bw" -> cb.like(join2.get(field2match).as(String.class), value+"%");
			case "ew" -> cb.like(join2.get(field2match).as(String.class), "%"+value);
			default -> cb.equal(join2.get(field2match).as(String.class), value);
			};
		};
	}
	
	public static<S,T> Specification<S> joinSelect(T target, String joinTo, String select1, String select2, List<String> containsIn){
		return (root,cq,cb) -> {	
			Join<S, T> join = root.join(joinTo);
			cq.multiselect(join.get(select1),join.get(select2));
			return join.get(select2).in(containsIn);
		};
	}
		
	public static<T> Specification<T> orderByAsc(SingularAttribute<T, String> fieldname){
		return (root,cq,cb) -> {cq.orderBy(cb.asc(root.get(fieldname)));return null;};
	}
	public static<T> Specification<T> orderByDesc(SingularAttribute<T, String> fieldname){
		return (root,cq,cb) -> {cq.orderBy(cb.desc(root.get(fieldname)));return null;};
	}
	
	// colName string
			public static<T> Integer maxNo(Class<T> entity, String attr, EntityManager em) {
				var cb = em.getCriteriaBuilder();
				var cq = cb.createQuery(Integer.class);
				var root = cq.from(entity);
				cq.select(cb.max(root.get(attr)));
				var result = em.createQuery(cq).getResultList();
				return result.isEmpty() ? null : em.createQuery(cq).setMaxResults(1).getSingleResult();
			}
			
			public static<T> String maxString(Class<T> entity, String attr, EntityManager em) {
				var cb = em.getCriteriaBuilder();
				var cq = cb.createQuery(String.class);
				var root = cq.from(entity);
				cq.select(root.get(attr))
				  .orderBy(cb.desc(root.get(attr)));
				var result = em.createQuery(cq).getResultList();
				return result.isEmpty() ? null : em.createQuery(cq).setMaxResults(1).getSingleResult();
			}
			
			public static<T> Optional<List<String>> select(Class<T> entity, String column, EntityManager em){
				var cb = em.getCriteriaBuilder();
				var cq = cb.createQuery(String.class);
				var root = cq.from(entity);
				cq.select(root.get(column))
				  .orderBy(cb.desc(root.get(column)));
				return Optional.ofNullable(
						em.createQuery(cq).getResultList());
			}
			public static<T> Specification<T> where(Class<T> entity,String fieldname, String condition, String value){

				return (root,cq,cb) -> switch(condition) {
					case "eq" -> cb.equal(root.get(fieldname), value);
					case "c" -> cb.like(root.get(fieldname), "%"+value+"%");
					case "bw" -> cb.like(root.get(fieldname), value+"%");
					case "ew" -> cb.like(root.get(fieldname), "%"+value);
					default -> cb.equal(root.get(fieldname), value);
					};
			}
			public static<T> Specification<T> where(Class<T> entity,String fieldname, String condition, Integer value1, Integer value2){

				return (root,cq,cb) -> switch(condition) {
					case "eq" -> cb.equal(root.get(fieldname), value1);
					case "gt" -> cb.greaterThan(root.get(fieldname), value1);
					case "lt" -> cb.lessThan(root.get(fieldname), value1);
					case "geq" -> cb.greaterThanOrEqualTo(root.get(fieldname), value1);
					case "leq" -> cb.lessThanOrEqualTo(root.get(fieldname), value1);
					case "bt" -> cb.between(root.get(fieldname), value1, value2);
					default -> cb.equal(root.get(fieldname), value1);
					};
			}
			public static<T> Specification<T> where(Class<T> entity,String fieldname, String condition, LocalDate value1, LocalDate value2){
				return (root,cq,cb) -> switch(condition) {
					case "eq" -> cb.equal(root.get(fieldname), value1);
					case "gt" -> cb.greaterThan(root.get(fieldname), value1);
					case "lt" -> cb.lessThan(root.get(fieldname), value1);
					case "geq" -> cb.greaterThanOrEqualTo(root.get(fieldname), value1);
					case "leq" -> cb.lessThanOrEqualTo(root.get(fieldname), value1);
					case "bt" -> cb.between(root.get(fieldname), value1, value2);
					default -> cb.equal(root.get(fieldname), value1);
					};
			}
			public static<T> Specification<T> where(Class<T> entity,String fieldname, Byte value){
				return (root,cq,cb) -> cb.equal(root.get(fieldname), value);
			}
			public static<T> Specification<T> whereEqual(Class<T> entity,String fieldname, String value){
				return (root,cq,cb) -> cb.equal(root.get(fieldname), value);
			}
			public static<T> Specification<T> whereEqual(Class<T> entity,String fieldname, Integer value){
				return (root,cq,cb) -> cb.equal(root.get(fieldname), value);
			}
			public static<T> Specification<T> whereEqual(Class<T> entity,String fieldname, long value){
				return (root,cq,cb) -> cb.equal(root.get(fieldname), value);
			}
			public static<T> Specification<T> whereHasLength(Class<T> entity,String fieldname, int length){
				return (root,cq,cb) -> cb.equal(cb.length(root.get(fieldname)), length);
			}
			public static<T> Specification<T> whereLike(Class<T> entity,String fieldname, String like){
				return (root,cq,cb) -> cb.like(root.get(fieldname), like);
			}
			public static<T> Specification<T> whereNotLike(Class<T> entity,String fieldname, String like){
				return (root,cq,cb) -> cb.notLike(root.get(fieldname), like);
			}
			public static<T> Specification<T> between(Class<T> entity,String fieldname, Integer upperbound, Integer lowerbound){
				return (root,cq,cb) -> cb.between(root.get(fieldname), upperbound, lowerbound);
			}
			public static<T> Specification<T> between(Class<T> entity,String fieldname, LocalDate upperbound, LocalDate lowerbound){
				return (root,cq,cb) -> cb.between(root.get(fieldname), upperbound, lowerbound);
			}
			
			public static<T> Specification<T> orderByAsc(Class<T> entity,String column){
				return (root,cq,cb) -> {cq.orderBy(cb.asc(root.get(column)));return null;};
			}
			public static<T> Specification<T> orderByDesc(Class<T> entity,String column){
				return (root,cq,cb) -> {cq.orderBy(cb.desc(root.get(column)));return null;};
			}
			public static<T> T maxWithSpecific(Class<T> entity, String attr, String value, String field, EntityManager em) {
				var cb = em.getCriteriaBuilder();
				var cq = cb.createQuery(entity);
				var root = cq.from(entity);			
				cq.where(cb.equal(root.get(attr), value))
				.orderBy(cb.desc(root.get(field)));
				var result = em.createQuery(cq).getResultList();
				return result.isEmpty() ? null : em.createQuery(cq).getResultList().get(0);
			}
			public static<T> Specification<T> whereNotEqual(Class<T> entity,String fieldname, Integer value){
				return (root,cq,cb) -> cb.notEqual(root.get(fieldname), value);
			}

}
